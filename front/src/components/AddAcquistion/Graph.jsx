import React from 'react';
import { DatePicker, Statistic, Row, Col, Avatar } from 'antd';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const { RangePicker } = DatePicker;
class graph extends React.Component {


  componentWillMount() {
    if (this.state.date1 !== 0) {
      var d = this.state.date2 - this.state.date1;
      var m = this.state.month2 - this.state.month1;
      var y = this.state.year2 - this.state.year2;
      var d1 = this.state.date1;
      var m1 = this.state.month1;
      var y1 = this.state.year1;
      var totalDay = d + (m * 30) + (y * 365) + 1;
      var m2;
      if (this.props.data !== undefined) {
        for (var x = 1; x <= totalDay; x++) {
          for (var object1 in this.props.data.data.months) {
            for (var object2 in this.props.data.data.months[object1].days) {
              if ((y1 * 10000 + m1 * 100 + d1 === this.props.data.data.months[object1].days[object2].date)) {
                switch (this.props.name1) {
                  case 'Sessions':
                    this.state.newData1.push(this.props.data.data.months[object1].days[object2].duration)
                    break;
                  case 'Delivery Method':

                    break;
                  case 'Avg Cost/Sessions':

                    break;
                  case 'Budget':

                    break;
                  case 'Bidding Limit':

                    break;
                  case 'Total Spent':
                    this.state.newData1.push(this.props.data.data.months[object1].days[object2].cost)
                    break;
                  default:
                      console.log("out of data")
                }
                switch (this.props.name2) {
                  case 'Sessions':
                    this.state.newData2.push(this.props.data.data.months[object1].days[object2].duration)
                    break;
                  case 'Delivery Method':

                    break;
                  case 'Avg Cost/Sessions':

                    break;
                  case 'Budget':

                    break;
                  case 'Bidding Limit':

                    break;
                  case 'Total Spent':
                    this.state.newData2.push(this.props.data.data.months[object1].days[object2].cost)
                    break;
                  default:
                    console.log("out of data")
                }
                switch (this.props.name3) {
                  case 'Sessions':
                    this.state.newData3.push(this.props.data.data.months[object1].days[object2].duration)
                    break;
                  case 'Delivery Method':

                    break;
                  case 'Avg Cost/Sessions':

                    break;
                  case 'Budget':

                    break;
                  case 'Bidding Limit':

                    break;
                  case 'Total Spent':
                    this.state.newData3.push(this.props.data.data.months[object1].days[object2].cost)
                    break;
                  default:
                      console.log("out of data")
                }
              }
              else {
                this.state.newData1.push(0)
                this.state.newData2.push(0)
                this.state.newData3.push(0)
              }
            }
          }
          var tem = d1 + '/' + m1 + '/' + y1;
          this.state.newDay.push(tem);
          if ((m1 === 1) || (m1 === 3) || (m1 === 5) || (m1 === 7) || (m1 === 8) || (m1 === 10) || (m1 === 12)) {
            m2 = 31;
          }
          else if ((m1 === 4) || (m1 === 6) || (m1 === 9) || (m1 === 11)) {
            m2 = 30;
          }
          else {
            if (((y1 % 4) === 0) && ((y1 % 100) !== 0)) {
              m2 = 29;
            }
            else {
              m2 = 28;
            }
          }
          if (d1 < m2) {
            d1++;
          }
          else {
            d1 = 1;
            if (m1 < 12) {
              m1++;
            }
            else {
              m1 = 1;
              y1 = 1;
            }
          }

        };

        this.getChartData();
      }
      else {
        alert("No Data")
      }
    }
  }
  deleteData() {
    for (var member in this.state.newDay) {
      delete this.state.newDay[member];
    }
    this.getChartData();

  };

  getChartData() {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: this.state.newDay,
        datasets: [
          {
            label: this.props.name1,
            data: this.state.newData1,
            backgroundColor: [
              'rgba(34, 240, 234 ,0.4)'
            ]
          },
          {
            label: this.props.name2,
            data: this.state.newData2,
            backgroundColor: [
              'rgba(255, 0, 255, 0.4)',
            ]
          },
          {
            label: this.props.name3,
            data:  this.state.newData3,
            backgroundColor: [
              'rgba(21, 160, 86, 0.4)',

            ]
          }

        ]
      }
    });
    this.setState({ value1: this.state.chartData.datasets[0].data.reduce((a, b) => a + b, 0) });
    this.setState({ value2: this.state.chartData.datasets[1].data.reduce((a, b) => a + b, 0) });
    this.setState({ value3: this.state.chartData.datasets[2].data.reduce((a, b) => a + b, 0) });

  }
  rundata(dates) {
    if (dates[0] !== undefined) {
      this.setState({ date1: dates[0].format("DD") });
      this.setState({ date2: dates[1].format("DD") });
      this.setState({ month1: dates[0].format("MM") });
      this.setState({ month2: dates[1].format("MM") });
      this.setState({ year1: dates[0].format("YYYY") });
      this.setState({ year2: dates[1].format("YYYY") });
      this.componentWillMount();
    }
    else {

      this.deleteData();

    }
    if (this.props.name1 !== undefined) {
      this.toggleEdit()
    }
    else {
      this.toggleunEdit()
    }
    if (this.props.name2 !== undefined) {
      this.toggleEdit2()
    }
    else {
      this.toggleunEdit2()
    }
    if (this.props.name3 !== undefined) {
      this.toggleEdit3()
    }
    else {
      this.toggleunEdit3()
    }

  }

  state = {
    size: 'default',
    edit1: true,
    edit2: true,
    edit3: true,
    date1: 0,
    date2: 0,
    month1: 0,
    month2: 0,
    year1: 0,
    year2: 0,
    chartData: {},
    newDay: [],
    newData1: [],
    newData2: [],
    newData3: [],
    value1: 0,
    value2: 0,
    value3: 0,
    /*dateData: {
      "data": {
        "months": [{
          "days": [
              {
                "adLogs": [
                  "5d3c48b4b2e1b66f15962ca0"],
                "_id": "5d3c48b4b2e1b66f15962ca3",
                "date": 20190727,
                "cost": 1,
                "duration": 31
              }
            ],
            "_id": "5d3c48b4b2e1b66f15962ca2",
            "month": 7,
            "cost": 1,
            "duration": 31
          }
        ],
        "_id": "5d3c48b4b2e1b66f15962ca1",
        "year": 2019,
        "cost": 1,
        "duration": 31
      }
    }*/

  };
  toggleEdit = () => {
    this.setState({ edit1: false });
  }
  toggleunEdit = () => {
    this.setState({ edit1: true });
  }
  toggleEdit2 = () => {
    this.setState({ edit2: false });
  }
  toggleunEdit2 = () => {
    this.setState({ edit2: true });
  }
  toggleEdit3 = () => {
    this.setState({ edit3: false });
  }
  toggleunEdit3 = () => {
    this.setState({ edit3: true });
  }


  render() {

    return (
      <div>
        <RangePicker
          ranges={{
            'This week': [moment().subtract(1, 'week'), moment()],
            'This Month': [moment().subtract(1, 'month'), moment()],
          }}

          onChange={dates => { this.rundata(dates) }}

        />
        <br />
        <br />
        <div className="chart">
          <Line
            data={this.state.chartData}
            options={{
              title: {
                display: false,
                text: 'test',
                fontSize: 25
              },
              legend: {
                display: true,
                position: "bottom"
              }
            }}
          />
        </div>
        <Row gutter={16}>
          <Col span={8}>
            {this.state.edit1 ?
              <div></div>
              :
              <div>
                <Avatar size={10} style={{ backgroundColor: '#6fffff', float: "left", marginTop: "6px" }} />
                <Statistic title={this.props.name1} value={this.state.value1} suffix={this.props.sub1} precision={2} />
              </div>
            }
          </Col>
          <Col span={8}>
            {this.state.edit2 ?
              <div></div>
              :
              <div>
                <Avatar size={10} style={{ backgroundColor: '#ff00ff', float: "left", marginTop: "6px" }} />
                <Statistic title={this.props.name2} value={this.state.value2} suffix={this.props.sub2} precision={2} />
              </div>
            }
          </Col>
          <Col span={8}>
            {this.state.edit3 ?
              <div></div>
              :
              <div>
                <Avatar size={10} style={{ backgroundColor: '#00a651', float: "left", marginTop: "6px" }} />
                <Statistic tyle={{ float: "left" }} title={this.props.name3} value={this.state.value3} suffix={this.props.sub3} precision={2} />
              </div>
            }
          </Col>
        </Row>,
      </div>
    );
  }
}
export default graph;
//onChange={date => { this.date1 = date[0]; this.date2 = date[1]; alert(this.date1.format("YYYY-MM-DD")) }}
//<Button type="primary" onClick={this.toggleEdit}></Button>
//alert(JSON.stringify(this.props.data.data.months[0].days[0].date))