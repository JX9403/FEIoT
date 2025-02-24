import { Card, Col, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import ChartSensor from "./chartSensor";
import { getListSensorData, postHistory } from "../../services/apiService";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [deviceState, setDeviceState] = useState({
    fan: false,
    light: false,
    airConditioner: false,
  });

  // Lấy trạng thái từ localStorage khi component mount
  useEffect(() => {
    const savedState = localStorage.getItem("deviceState");
    if (savedState) {
      setDeviceState(JSON.parse(savedState));
    }
  }, []);
  // Hàm gọi API
  const fetchSensorData = async () => {
    let query = ``;

    const res = await getListSensorData(query);
    console.log(" res << ", res);
    if (res && res.data) {
      setSensorData(res.data);
    }
    // setIsLoading(false);
  };
  // Gọi API khi component mount
  useEffect(() => {
    fetchSensorData();

    // Cập nhật dữ liệu mỗi 2 giây
    const interval = setInterval(fetchSensorData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Hàm gửi yêu cầu bật/tắt thiết bị
  const handleDeviceChange = async (device, checked) => {
    const action = checked ? "on" : "off";
    const res = await postHistory(device, action);
    const newState = { ...deviceState, [device]: checked };
    setDeviceState(newState);
    localStorage.setItem("deviceState", JSON.stringify(newState));

    console.log(res);
  };

  // Lấy dữ liệu mới nhất
  const latestData = sensorData[sensorData.length - 1] || {
    temperature: 30,
    humidity: 60,
    light: 500,
  };

  const onChange = (checked) => {
    console.log(`Switch to ${checked}`);
  };

  return (
    <>
      <Row gutter={[30, 30]} style={{ marginBottom: 30 }}>
        <Col span={8}>
          <Card bordered={true}>
            <div
              style={{
                minHeight: 60,
                display: "flex",
                alignItems: "center",
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <div style={{ marginRight: 40 }}>
                <i
                  className="fa-solid fa-temperature-low"
                  style={{ fontSize: 30, color: "#db3241" }}
                ></i>
              </div>
              <div style={{ fontSize: 30, color: "#db3241", fontWeight: 500 }}>
                {latestData.temperature} &deg;C
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <div
              style={{
                minHeight: 60,
                display: "flex",
                alignItems: "center",
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <div style={{ marginRight: 40 }}>
                <i
                  className="fa-solid fa-droplet"
                  style={{ fontSize: 30, color: "#1ed998" }}
                ></i>
              </div>
              <div style={{ fontSize: 30, color: "#1ed998", fontWeight: 500 }}>
                {latestData.humidity} %
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <div
              style={{
                minHeight: 60,
                display: "flex",
                alignItems: "center",
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <div style={{ marginRight: 40 }}>
                <i
                  className="fa-regular fa-sun"
                  style={{ fontSize: 30, color: "#e8b81a" }}
                ></i>
              </div>
              <div style={{ fontSize: 30, color: "#e8b81a", fontWeight: 500 }}>
                {latestData.light} Lux
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[40, 40]}>
        <Col span={16}>
          <Card style={{ height: "100%" }} bordered={false}>
            <ChartSensor sensorData={sensorData} />
          </Card>
        </Col>
        <Col span={8}>
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <Card bordered={false}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 40px",
                    minHeight: 80,
                  }}
                >
                  <i className="fa-solid fa-fan" style={{ fontSize: 40 }}></i>
                  <Switch
                    checked={deviceState["fan"]}
                    onChange={(checked) => handleDeviceChange("fan", checked)}
                  />
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 40px",
                    minHeight: 80,
                  }}
                >
                  <i
                    className="fa-solid fa-lightbulb"
                    style={{ fontSize: 40 }}
                  ></i>
                  <Switch
                    checked={deviceState["light"]}
                    onChange={(checked) => handleDeviceChange("light", checked)}
                  />
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 40px",
                    minHeight: 80,
                  }}
                >
                  <i
                    className="fa-brands fa-pagelines"
                    style={{ fontSize: 40 }}
                  ></i>
                  <Switch
                    checked={deviceState["air-conditioner"]}
                    onChange={(checked) =>
                      handleDeviceChange("air-conditioner", checked)
                    }
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
