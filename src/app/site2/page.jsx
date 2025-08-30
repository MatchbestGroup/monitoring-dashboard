import Sidebar from "../components/Sidebar";
import GrafanaEmbed from "../components/GrafanaEmbed";

export default function Site1() {
  return (
    <>
      <Sidebar />
      <main className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">Site 1 - Health</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#0b1220] p-4 rounded border border-gray-700">
            <h3 className="font-semibold">Uptime</h3>
            <GrafanaEmbed src="http://localhost:3000/d-solo/000000012/grafana-play-home?orgId=1&panelId=2" />
          </div>

          <div className="bg-[#0b1220] p-4 rounded border border-gray-700">
            <h3 className="font-semibold">Logs (Loki)</h3>
            <GrafanaEmbed src="http://localhost:3000/explore?orgId=1&left=Logs" />
          </div>
        </div>
      </main>
    </>
  );
}
