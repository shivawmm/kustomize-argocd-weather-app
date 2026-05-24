const express = require('express');

const app = express();

const PORT = 3000;

const weatherData = [
  {
    city: 'Delhi',
    temperature: '38°C',
    condition: 'Sunny'
  },
  {
    city: 'Mumbai',
    temperature: '31°C',
    condition: 'Cloudy'
  },
  {
    city: 'Bangalore',
    temperature: '27°C',
    condition: 'Rainy'
  }
];

app.get('/', (req, res) => {

  const weatherCards = weatherData.map(weather => `
    <div class="card">
      <h2>${weather.city}</h2>

      <p class="temp">${weather.temperature}</p>

      <p>${weather.condition}</p>
    </div>
  `).join('');

  const html = `
    <html>
      <head>
        <title>Kustomize + ArgoCD Demo</title>

        <style>
          body {
            background-color: #0f172a;
            color: white;
            font-family: Arial;
            padding: 40px;
          }

          h1 {
            text-align: center;
            color: #38bdf8;
          }

          .container {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 40px;
          }

          .card {
            background-color: #1e293b;
            padding: 25px;
            border-radius: 12px;
            width: 220px;
            text-align: center;
          }

          .temp {
            font-size: 30px;
            color: #38bdf8;
            font-weight: bold;
          }

          .footer {
            margin-top: 50px;
            text-align: center;
          }
        </style>
      </head>

      <body>

        <h1>☁️ Kustomize + ArgoCD Weather Dashboard</h1>

        <div class="container">
          ${weatherCards}
        </div>

        <div class="footer">
          <p><strong>Environment:</strong> Development</p>
          <p><strong>Version:</strong> v2</p>
          <p><strong>Platform:</strong> Kustomize + ArgoCD</p>
        </div>

      </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});