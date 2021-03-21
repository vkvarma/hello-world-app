import "./Contractor.css";
import React, { useEffect, useState } from "react";
import { Row, Col, Divider } from 'antd';

const ContractorComponent = () => {

    const [ contractorDetails , setContractorDetails ] = useState({});
    const [ contractorNo ] = useState("C10002");
    let contractor = null;
    const style = { padding: '8px 0' };

    useEffect(() => {
        getContractorDetailsResponseData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getContractorDetailsResponseData = async () => {
        let contractorDetailsListResponse = [
            {
                no: "C10001",
                name: "Paul Right",
                company: "American Express"
            },
            {
                no: "C10002",
                name: "John Mike",
                company: "Google"
            },
            {
                no: "C10003",
                name: "Zach Daniel",
                company: "Amazon"
            },
            {
                no: "C10004",
                name: "Abraham Desooza",
                company: "Facebook"
            }
        ];

        
        contractorDetailsListResponse.filter((contractorDetails) => contractorDetails.no === contractorNo).map((detail) => {
            contractor = detail;
            return false;
        });
        setContractorDetails(contractor);
    };

    return (
        <>
           { contractorDetails && <>
            <Divider orientation="left">Contractor's Details</Divider>
                <Row className="contractor-grid" gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>C# :</div>
                        <div style={style}>Name :</div>
                        <div style={style}>Company :</div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>{contractorDetails.no}</div>
                        <div style={style}>{contractorDetails.name}</div>
                        <div style={style}>{contractorDetails.company}</div>
                    </Col>
                </Row>
            </>
            }
        </>
    )
}

export default ContractorComponent;