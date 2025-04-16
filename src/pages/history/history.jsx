import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "antd";
import InputSearch from "./InputSearch";
import { ReloadOutlined } from "@ant-design/icons";

import moment from "moment";
// import { fakeHistoryData } from "../../../fakeData";
import { getListHistoryData } from "../../services/apiService";

const History = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sortOrder=desc");

  const fetchHistoryData = async () => {
    let query = `?page=${current - 1}&size=${pageSize}`;
    if (filter) {
      query += `${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    console.log("query<<", query);
    const res = await getListHistoryData(query);
    console.log(" res << ", res);
    if (res && res.content) {
      setData(res.content);
      setTotal(res.totalElements);
    }
  };

  // Gọi API mỗi 2 giây
  useEffect(() => {
    fetchHistoryData(); // Gọi lần đầu tiên
    console.log("Page:", current, "PageSize:", pageSize);
  }, [current, pageSize, filter, sortQuery]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Device",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      sorter: true,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      sorter: true,
      render: (text, record, index) => {
        return (
          <span>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</span>
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
        <span>History Device</span>
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

export default History;
