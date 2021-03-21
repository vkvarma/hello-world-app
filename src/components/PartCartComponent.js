import "./PartCart.css";
import React, { useEffect, useState } from "react";
import { InputNumber, Button, Row, Col, Divider, Input } from 'antd';

const PartCartComponent = () => {

    const [ partsRowList, setPartsRowList ] = useState([]);
    const [ partsDataList, setPartsDataList] = useState([]);
    const [ partsTotalSummary, setPartsTotalSummary] = useState({
        subTotal: 0.00,
        discountRate: 0.00,
        discountAmount: 0.00,
        taxRate: 6.00,
        taxAmount: 0.00,
        total: 0.00
    });
    const style = { height: '37px' };

    useEffect(() => {
        getPartsResponseData();
    }, []);

    const getPartsResponseData = async () => {
        const partsDataListResponse = [
            {
                partNo: "p0001",
                partName: "partname1",
                partCost: "100"
            },
            {
                partNo: "p0002",
                partName: "partname2",
                partCost: "200"
            },
            {
                partNo: "p0003",
                partName: "partname3",
                partCost: "300"
            },
            {
                partNo: "p0004",
                partName: "partname4",
                partCost: "400"
            }
        ];
        setPartsDataList(partsDataListResponse);
    };

    const populatePartName = (event, itemIndex) => {
        if(!event.target.value) {
            const rows = [...partsRowList];
            rows[itemIndex].partName = "";
            rows[itemIndex].partNo = "";
            setPartsRowList([...rows]);
        }
        else if(event.target.value) {
            partsDataList.forEach((item) => {
                if(item.partNo === event.target.value) {
                    const rows = [...partsRowList];
                    rows[itemIndex].partName = item.partName;
                    rows[itemIndex].partNo = item.partNo;
                    setPartsRowList([...rows]);
                    return false;
                }
            });
        }
    };

    const populatePartCost = (event, itemIndex) => {
        
        console.log("populatePartCost => ", itemIndex);

        if(!event.target.value) {
            const rows = [...partsRowList];
            rows[itemIndex].partQty = "";
            rows[itemIndex].partCost = "";
            setPartsRowList([...rows]);
        }
        else if(event.target.value) {
            partsDataList.forEach((item) => {
                const rows = [...partsRowList];
                if(rows[itemIndex].partNo === item.partNo) {
                    let costPerQty = parseInt(item.partCost) * parseInt(event.target.value);
                    rows[itemIndex].partQty = event.target.value;
                    rows[itemIndex].partCost = costPerQty;
                    setPartsRowList([...rows]);
                    return false;
                }
            });
        }
        
    };
    
    const addNewPartRow = () => {

        setPartsRowList(
            [...partsRowList, {
                partNo: "",
                partName: "",
                partQty: 0,
                partCost: ""
            }]
        );
            
    };
    
    const calculateSubTotal = () => {
        if(partsRowList && partsRowList.length > 0) {
            
            let subTotal = 0.00;
            partsRowList.forEach(part => {
                
                if(part && part.partNo && part.partName && part.partCost) {
                    console.log("!!! Calculating SubTotal !!!");
                    subTotal = Number.parseFloat(subTotal) + Number.parseFloat(part.partCost);
                }
            });
            setPartsTotalSummary({ 
                subTotal: subTotal,
                discountRate: 0.00,
                discountAmount: 0.00,
                taxRate: 6.00,
                taxAmount: 0.00,
                total: 0.00 
            }); 
        }  
    };

    const calculateAndApplyDiscount = (event) => {
        if(event.target.value) {
        
            let subTotal = Number.parseFloat(partsTotalSummary.subTotal);
            let discountRate = Number.parseFloat(event.target.value);
            let discountAmount = Number.parseFloat((subTotal * discountRate)/100);
            let subTotalAfterDiscount = Number.parseFloat(subTotal - discountAmount);
            let taxRate = Number.parseFloat(partsTotalSummary.taxRate);
            let taxAmount = Number.parseFloat((subTotalAfterDiscount * taxRate)/100);
            let total = Number.parseFloat(subTotalAfterDiscount + taxAmount);

            setPartsTotalSummary({ 
                subTotal: subTotal,
                discountRate: discountRate,
                discountAmount: discountAmount,
                taxRate: taxRate,
                taxAmount: taxAmount,
                total: total
            });
        }
    };

    const printDetails = () => {
        console.log("!!! Printing Details !!!");
    };

    const closeDialog = () => {
        console.log("!!! Closing Dialog !!!");
    };
    
    return (
        <>
            <Divider orientation="left">Part's Details</Divider>
            <Row className="parts-container">
                <Col className="parts-button-panel">
                    <Button type="primary" className="parts-btn" size={120} onClick={() => addNewPartRow()}>Add New</Button>
                    <Button type="primary" className="parts-btn" size={120} onClick={() => calculateSubTotal()}>Calculate</Button>
                    <Button type="primary" className="parts-btn" size={120} onClick={() => printDetails()}>Print</Button>
                    <Button type="primary" className="parts-btn" size={120} onClick={() => closeDialog()}>Close</Button>
                </Col>
                <div className="divider-vertical"></div>
                
                <Col className="parts-cart">
                    <Row className="parts-row-heading-container">
                        <Col className="parts-row-heading">Part No</Col>
                        <Col className="parts-row-heading">Part Name</Col>
                        <Col className="parts-row-heading">Part Qty</Col>
                        <Col className="parts-row-heading">Part Cost</Col>
                    </Row>
                    <Row className="parts-record-container">
                        {partsRowList && partsRowList.map((part, i) => {
                            return (
                                <Col className="parts-record-panel" key={i}>
                                    <Input name="partNo" placeholder="Enter Part No" defaultValue="" type="text" onChange={(e) => populatePartName(e, i)} />
                                    <Input name="partName" placeholder="Part Name" type="text" value={part.partName}  onChange={() => {}} />
                                    <Input name="partQty" min="0" placeholder="Enter Qty" defaultValue="" type="number" onChange={(e) => populatePartCost(e, i)}  />
                                    <Input name="totalCostQty" placeholder="Total Cost" type="text" value={part.partCost}  onChange={() => {}} />
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row> 
            
            <Row className="parts-calculation-summary">
                    <Col className="gutter-row" span={12}>
                        <div style={style}>Subtotal :</div>
                        <div style={style}>Discount (%):</div>
                        <div style={style}>Tax {`(${partsTotalSummary?.taxRate?.toFixed(2)}%)`}</div>
                        <div style={style}>Total :</div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div style={style}><InputNumber className="input-number-class" onChange={() => {}} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} name="subtotal" size={20} readOnly={true} value={`${partsTotalSummary?.subTotal?.toFixed(2)}`} /></div>
                        <div style={style}><Input className="input-number-class" name="discount" size={20} readOnly={partsTotalSummary?.subTotal === 0}  defaultValue="" onBlur={(e) => calculateAndApplyDiscount(e)} onChange={(e) => calculateAndApplyDiscount(e)} /></div>
                        <div style={style}><InputNumber className="input-number-class" formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} name="tax" size={20}  readOnly={true}  onChange={() => {}} value={partsTotalSummary?.taxAmount?.toFixed(2)}/></div>
                        <div style={style}><InputNumber className="input-number-class" formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} name="total" size={20} readOnly={true}   onChange={() => {}} value={partsTotalSummary?.total?.toFixed(2)} /></div> 
                    </Col>
            </Row> 
        </>
    )

}

export default PartCartComponent;