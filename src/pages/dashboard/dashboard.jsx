import { Card, Col, Row, Statistic, Switch } from "antd";
import { useEffect, useState } from "react";
import ChartSensor from "./chartSensor";
// import CountUp from "react-countup";
// import { callFetchDashboard } from "../../services/apiService";

const Dashboard = () => {
  // useEffect(() => {
  //   const initDashboard = async () => {
  //     const res = await callFetchDashboard();
  //     if (res && res.data) setDataDashboard(res.data);
  //   };
  //   initDashboard();
  // }, []);

  // const formatter = (value) => <CountUp end={value} separator="," />;

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
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
              <div>
                <div
                  className="card-value"
                  style={{ fontSize: 30, color: "#db3241", fontWeight: 500 }}
                >
                  30 &deg;C
                </div>
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
                  class="fa-solid fa-droplet"
                  style={{ fontSize: 30, color: "#1ed998" }}
                ></i>
              </div>
              <div>
                <div
                  className="card-value"
                  style={{ fontSize: 30, color: "#1ed998", fontWeight: 500 }}
                >
                  30 &deg;C
                </div>
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
                  class="fa-regular fa-sun"
                  style={{ fontSize: 30, color: "#e8b81a" }}
                ></i>
              </div>
              <div>
                <div
                  className="card-value"
                  style={{ fontSize: 30, color: "#e8b81a", fontWeight: 500 }}
                >
                  30 &deg;C
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[40, 40]}>
        <Col span={16}>
          <Card style={{ height: "100%" }} bordered={false}>
            <ChartSensor />
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
                    paddingLeft: 40,
                    paddingRight: 40,
                    minHeight: 80,
                  }}
                >
                  <div>
                    <i
                      className="fa-solid fa-fan"
                      style={{ fontSize: 40, color: "" }}
                    ></i>
                  </div>
                  {/* <div style={{ fontSize: 20, fontWeight: 500 }}>Fan</div> */}
                  <Switch defaultChecked onChange={onChange} />
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
                    paddingLeft: 40,
                    paddingRight: 40,
                    minHeight: 80,
                  }}
                >
                  <div>
                    <i
                      className="fa-solid fa-lightbulb"
                      style={{ fontSize: 40, color: "" }}
                    ></i>
                  </div>
                  {/* <div style={{ fontSize: 20, fontWeight: 500 }}>Fan</div> */}
                  <Switch defaultChecked onChange={onChange} />
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
                    paddingLeft: 40,
                    paddingRight: 40,
                    minHeight: 80,
                  }}
                >
                  <div>
                    <i
                      class="fa-brands fa-pagelines"
                      style={{ fontSize: 40, color: "" }}
                    ></i>
                  </div>
                  {/* <div style={{ fontSize: 20, fontWeight: 500 }}>Fan</div> */}
                  <Switch defaultChecked onChange={onChange} />
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
