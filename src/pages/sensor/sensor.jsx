import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Popconfirm,
  Button,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { render } from "react-dom";
import moment from "moment";
import { fakeSensorData } from "../../../fakeData";
import { getListSensorData } from "../../services/apiService";

// https://stackblitz.com/run?file=demo.tsx
const Sensor = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sortOrder=desc");

  // useEffect(() => {
  //   fetchBook();
  // }, [current, pageSize, filter, sortQuery]);

  const fetchSensorData = async () => {
    // setIsLoading(true);
    let query = `?page=${current}&limit=${pageSize}`;
    if (filter) {
      query += `${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    console.log("query<<", query);
    const res = await getListSensorData(query);
    console.log(" res << ", res);
    if (res && res.data) {
      setData(res.data);
      setTotal(res.totalRows);
    }
    // setIsLoading(false);
  };

  // Gọi API mỗi 2 giây
  useEffect(() => {
    fetchSensorData(); // Gọi lần đầu tiên
    const interval = setInterval(fetchSensorData, 2000);
    return () => clearInterval(interval); // Xóa interval khi unmount
  }, [current, pageSize, filter, sortQuery]);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            // onClick={() => {
            //   // console.log(record);
            //   setDataViewDetail(record);
            //   setOpenViewDetail(true);
            // }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
      sorter: true,
    },
    {
      title: "Humidity",
      dataIndex: "humidity",
      sorter: true,
    },
    {
      title: "Light",
      dataIndex: "light",
      sorter: true,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      sorter: true,
      render: (text, record, index) => {
        return (
          <span>
            {moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")} /
            {record.createdAt}
          </span>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const sortOrder = sorter.order === "ascend" ? "asc" : `desc`;
      const sortBy = sorter.field; // Trường sắp xếp
      setSortQuery(`sortBy=${sortBy}&sortOrder=${sortOrder}`);
    }
  };

  // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Sensor Data</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <ReloadOutlined />
          </Button>
        </span>
      </div>
    );
  };

  const handleSearch = (query) => {
    console.log("input query", query);
    setFilter(query);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            loading={false}
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Sensor;
