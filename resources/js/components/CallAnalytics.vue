<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Call Analytics</h3>
      <div class="mt-6">
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'CallAnalytics',
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chart.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Inbound Calls',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Outbound Calls',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Weekly Call Volume'
            }
          }
        }
      });
    }
  }
}
</script>