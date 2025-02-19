import { Card, Col, Descriptions, Row } from "antd";

import img from "../../assets/avt.jpg";
const Profile = () => {
  return (
    <>
      <Row gutter={[40, 40]}>
        <Col span={8}>
          <Card>
            <div
              className="avt-img"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <div
                className="image"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
            <div
              className="avt-name"
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 30,
              }}
            >
              Doan Thi Diem
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="Profile" style={{ width: "100%" }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Tên">Đoàn Thị Diễm</Descriptions.Item>
              <Descriptions.Item label="Mã sinh viên">
                B21DCPT075
              </Descriptions.Item>
              <Descriptions.Item label="Lớp học">D21PTDPT</Descriptions.Item>
              <Descriptions.Item label="Tên đề tài">
                Phát triển hệ thống quản lý sinh viên
              </Descriptions.Item>
              <Descriptions.Item label="Công nghệ sử dụng">
                ReactJS, Node.js, MongoDB, Ant Design
              </Descriptions.Item>
              <Descriptions.Item label="Link GitHub">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  github.com/doanthidiem/project
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Link PDF">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Tải báo cáo PDF
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
