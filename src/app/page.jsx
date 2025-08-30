
"use client";
import { useAuth } from '../components/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PrometheusHelper from "../lib/prometheus"; // we'll add helper
import GrafanaEmbed from './components/GrafanaEmbed';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [upData, setUpData] = useState([]); // State to hold Prometheus data

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchPrometheusData = async () => {
      // quick summary: call Prometheus API (server-side)
      const prom = new PrometheusHelper("http://localhost:9090");
      // sample query - up metric (blackbox + nextjs scrape)
      try {
        const data = await prom.query('up');
        setUpData(data); // Update state with fetched data
      } catch (e) {
        // ignore, show minimal
        console.error("Error fetching Prometheus data:", e); // Log error for debugging
      }
    };

    fetchPrometheusData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Build a simple status map (demo)
  const sites = [
    { name: "site1", url: "http://aimavs.com", status: (upData.result || []).find(r => r.metric.instance?.includes('site1')) ? "Up" : "Unknown" },
    { name: "site2", url: "http://site2.local", status: (upData.result || []).find(r => r.metric.instance?.includes('site2')) ? "Up" : "Unknown" }
  ];

  return (
    <>
      
      <main className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <section className="grid grid-cols-2 gap-6 mb-8">
          {sites.map((s) => (
            <div key={s.name} className="bg-[#0b1220] p-4 rounded border border-gray-700">
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="mt-2">Status: <span className={s.status === "Up" ? "text-green-400" : "text-yellow-300"}>{s.status}</span></p>
              <p>URL: <a className="text-blue-400" href={s.url}>{s.url}</a></p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl mb-4">Grafana Dashboard</h2>
          <GrafanaEmbed url="http://localhost:3000/d-solo/000000012/grafana-play-home?orgId=1&panelId=2" />
        </section>
      </main>
    </>
  );
}
