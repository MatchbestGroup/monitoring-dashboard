import axios from 'axios';

export default class PrometheusHelper {
  constructor(baseUrl = 'http://localhost:9090') {
    // Remove trailing slash
    this.base = baseUrl.replace(/\/+$/, '');
    this.client = axios.create({
      baseURL: this.base,
      timeout: 10000, // default timeout
    });
  }

  // Instant query
  async query(expr) {
    try {
      const res = await this.client.get('/api/v1/query', {
        params: { query: expr },
      });
      if (res.data.status !== 'success') {
        throw new Error(`Prometheus query failed: ${res.data.error || 'unknown error'}`);
      }
      return res.data.data; // contains resultType + result
    } catch (error) {
      console.error(`Error in Prometheus query: ${expr}`, error.message);
      throw error;
    }
  }

  // Range query
  async rangeQuery(expr, start, end, step = '15s') {
    try {
      const res = await this.client.get('/api/v1/query_range', {
        params: { query: expr, start, end, step },
      });
      if (res.data.status !== 'success') {
        throw new Error(`Prometheus range query failed: ${res.data.error || 'unknown error'}`);
      }
      return res.data.data;
    } catch (error) {
      console.error(`Error in Prometheus rangeQuery: ${expr}`, error.message);
      throw error;
    }
  }

  // Example: get current CPU usage %
  async getCpuUsage() {
    return this.query('100 - (avg by(instance)(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)');
  }

  // Example: get memory usage %
  async getMemoryUsage() {
    return this.query('(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100');
  }
}
