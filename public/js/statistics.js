const charts = document.getElementById('myChart');
let lastChart;
const createChart = (labels, data, label) => {
  if (lastChart) {
    console.log(lastChart);
    lastChart.destroy();
  }
  lastChart = new Chart(charts, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderWidth: 1,
          backgroundColor: '#ff62009f',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const createLineChart = (labels, data, label) => {
  if (lastChart) {
    console.log(lastChart);
    lastChart.destroy();
  }
  lastChart = new Chart(charts, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          fill: false,
          borderColor: '#f69214',
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const getMonthsProfits = async () => {
  const labels = [];
  const data = [];
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/orders/statisticsMenu',
    });

    if (res.data.status === 'success') {
      for (const stat of res.data.data) {
        labels.push(`${months[stat._id.month - 1]}-${stat._id.year}`);
        data.push(stat.monthlyTotalPrice);
      }
      createLineChart(
        labels.reverse(),
        data.reverse(),
        'Profits of each month in $',
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLatestMonth = async (orderOrPrice) => {
  const labels = [];
  const data = [];
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/orders/statisticsMenu',
    });

    if (res.data.status === 'success') {
      const latestMonth = res.data.data[0];
      for (const meal of latestMonth.meals) {
        labels.push(meal.mealName);
        data.push(
          orderOrPrice === 'price' ? meal.totalPrice : meal.totalOrdered,
        );
      }
      createChart(
        labels,
        data,
        `Profits for the latest month based on the total ${
          orderOrPrice === 'price' ? 'prices' : 'orders'
        } of meals`,
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSelectOptions = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/orders/statisticsMenu',
    });

    if (res.data.status === 'success') {
      document.querySelector('.month-select').innerHTML = '';
      for (const stat of res.data.data) {
        document.querySelector('.month-select').innerHTML += `<option value="${
          stat._id.month
        }-${stat._id.year}">${months[stat._id.month - 1]}-${
          stat._id.year
        }</option>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const findMonthAndGetStat = async (month, year) => {
  const labels = [];
  const data = [];
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/orders/statisticsMenu',
    });
    if (res.data.status === 'success') {
      for (const stat of res.data.data) {
        if (stat._id.month === month && stat._id.year === year) {
          for (const meal of stat.meals) {
            labels.push(meal.mealName);
            data.push(meal.totalPrice);
          }
          break;
        }
      }
      createChart(labels, data, `Profits for ${months[month-1]}-${year} in $`);
    }
  } catch (error) {
    console.log(error);
  }
};
