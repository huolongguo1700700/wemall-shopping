import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import { Row, Col }          from 'antd';
import LineChart             from '../components/LineChart';
import Software              from './Software';
import requestOrderAnalyze   from '../actions/requestOrderAnalyze';
import requestOrder30d       from '../actions/requestOrder30d';
import requestOrderAmount30d from '../actions/requestOrderAmount30d';
import analyze               from '../../sdk/analyze';
import '../../../styles/admin/orderAnalyze.css';

/*
 * 管理后台，订单分析
 */
class OrderAnalyze extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(requestOrderAnalyze());
        dispatch(requestOrder30d());
        dispatch(requestOrderAmount30d());
        analyze.pv();
	}
    render() {
    	let { data } = this.props;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={6}>
                        <div className="order-analyze" style={{backgroundColor: '#3598dc'}}>
                            <div className="order-analyze-numberwrap">
                                <p className="order-analyze-number">{data.todayOrderCount}</p>
                                <p className="order-analyze-desc">Orders of the day</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="order-analyze" style={{backgroundColor: '#e7505a'}}>
                            <div className="order-analyze-numberwrap">
                                <p className="order-analyze-number"><span>¥</span>{data.todayTotalSale}</p>
                                <p className="order-analyze-desc">Sales amount of the day</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="order-analyze" style={{backgroundColor: '#32c5d2'}}>
                            <div className="order-analyze-numberwrap">
                                <p className="order-analyze-number">{data.yesterdayOrderCount}</p>
                                <p className="order-analyze-desc">Orders of last day</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="order-analyze" style={{backgroundColor: '#8E44AD'}}>
                            <div className="order-analyze-numberwrap">
                                <p className="order-analyze-number"><span>¥</span>{data.yesterdayTotalSale}</p>
                                <p className="order-analyze-desc">Sales of last day</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="order-chart-box">
                            <div className="order-chart-title">Order trend</div>
                            <div className="order-chart">
                                <LineChart collapsed={this.props.collapsed} 
                                    xName="createdAt" yName="count" 
                                    yLabel="Order counts"
                                    data={data.orders}></LineChart>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="order-chart-box">
                            <div className="order-chart-title">Sales trend</div>
                            <div className="order-chart">
                                <LineChart collapsed={this.props.collapsed} 
                                    xName="payAt" yName="amount" 
                                    yLabel="Sales counts"
                                    data={data.amounts}></LineChart>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Software />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.orderAnalyze
    };
}

export default connect(mapStateToProps)(OrderAnalyze);

