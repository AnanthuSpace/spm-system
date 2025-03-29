import { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, message } from 'antd';
// import { getVerificationRequests, approveRequest, rejectRequest } from '../../../api/adminApi';

const VerificationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

  const fetchRequests = async () => {
    // setLoading(true);
    // try {
    // //   const response = await getVerificationRequests();
    //   setRequests(response.data);
    // } catch (error) {
    //   console.error('Error fetching verification requests:', error);
    // } finally {
    //   setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    // try {
    //   await approveRequest(requestId);
    //   message.success('Company approved successfully');
    //   fetchRequests();
    // } catch (error) {
    //   message.error('Failed to approve company');
    // }
  };

  const handleReject = async (requestId) => {
    // try {
    //   await rejectRequest(requestId);
    //   message.success('Company rejected successfully');
    //   fetchRequests();
    // } catch (error) {
    //   message.error('Failed to reject company');
    // }
  };

  const showDetails = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => (
        <Button type="link" onClick={() => showDetails(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedBy',
      key: 'submittedBy',
      render: (user) => `${user.name} (${user.email})`,
    },
    {
      title: 'Submitted On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'pending' ? 'orange' : status === 'approved' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
     