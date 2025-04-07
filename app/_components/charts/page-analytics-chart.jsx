import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Generate distinct colors for each element
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A4DE6C",
  "#D0ED57",
];

const PageAnalyticsChart = ({ data, dateRange }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    switch (dateRange) {
      case "today":
        return date.toLocaleTimeString();
      case "lastweek":
      case "lastmonth":
        return date.toLocaleDateString("fa-IR", {
          month: "short",
          day: "numeric",
        });
      case "last3month":
      case "last6month":
      case "lastyear":
        return date.toLocaleDateString("fa-IR", {
          month: "short",
          year: "numeric",
        });
      default:
        return date.toLocaleTimeString();
    }
  };

  const getMonthYearKey = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, "0")}`;
  };

  // Process all data together to get consistent time points
  const processAllData = (allData) => {
    const timePoints = {};

    allData.forEach((item) => {
      const date = new Date(item.clickedAt);
      let key;

      switch (dateRange) {
        case "today":
          key = `${date.getHours()}:00`;
          break;
        case "lastweek":
          key = date.toLocaleDateString();
          break;
        case "lastmonth":
          key = date.getDate();
          break;
        case "last3month":
        case "last6month":
        case "lastyear":
          key = getMonthYearKey(date);
          break;
        default:
          key = date.toLocaleTimeString();
      }

      if (!timePoints[key]) {
        timePoints[key] = {
          date: formatDate(item.clickedAt),
          sortKey: date.getTime(),
          originalDate: date,
        };
      }
    });

    // Convert to array and sort
    return Object.values(timePoints).sort((a, b) => a.sortKey - b.sortKey);
  };

  // Aggregate data for each element
  const aggregateElementData = (elementData, timePoints) => {
    const aggregated = {};

    // Initialize all time points with 0 clicks
    timePoints.forEach((point) => {
      aggregated[point.date] = {
        ...point,
        clicks: 0,
      };
    });

    // Count clicks for this element
    elementData.forEach((item) => {
      const date = formatDate(item.clickedAt);
      if (aggregated[date]) {
        aggregated[date].clicks += 1;
      }
    });

    return Object.values(aggregated);
  };

  // Group data by elementId
  const groupByElementId = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.elementId]) {
        acc[item.elementId] = {
          name: item.elementName || "بلوک بدون نام",
          data: [],
        };
      }
      acc[item.elementId].data.push(item);
      return acc;
    }, {});
  };

  const groupedData = groupByElementId(data);
  const allDataPoints = processAllData(data);
  const elementIds = Object.keys(groupedData);

  // Prepare chart data - combine all elements into one dataset
  const prepareChartData = () => {
    return allDataPoints.map((timePoint) => {
      const dataPoint = {
        date: timePoint.date,
        sortKey: timePoint.sortKey,
      };

      elementIds.forEach((elementId, index) => {
        const element = groupedData[elementId];
        const elementAggregated = aggregateElementData(
          element.data,
          allDataPoints,
        );
        const matchingPoint = elementAggregated.find(
          (p) => p.date === timePoint.date,
        );
        dataPoint[element.name] = matchingPoint ? matchingPoint.clicks : 0;
      });

      return dataPoint;
    });
  };

  const chartData = prepareChartData();

  return (
    <div className="analytics-chart">
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {elementIds.map((elementId, index) => {
              const element = groupedData[elementId];
              return (
                <Line
                  key={elementId}
                  type="monotone"
                  dataKey={element.name}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PageAnalyticsChart;
