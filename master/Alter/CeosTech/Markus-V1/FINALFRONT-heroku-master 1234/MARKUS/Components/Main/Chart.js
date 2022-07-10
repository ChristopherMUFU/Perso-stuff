import React from 'react';
import { View, RefreshControl } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Svg, { Text, Circle } from 'react-native-svg';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

export default class PieChartWithCenteredLabels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            total: 0,
            selection: this.props.selection
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data, selection: nextProps.selection });  
    }

    repartitionE(){
        const data = [
            {
                key: "Sur place",
                amount: this.state.data != null ? parseFloat(this.state.data["sur place"][this.state.selection].toFixed(1)) : 0,
                svg: { fill: '#3CA6C6' },
            },
            {
                key: "Livraison",
                amount: this.state.data != null ? parseFloat(this.state.data.livraison[this.state.selection].toFixed(1)) : 0,
                svg: { fill: '#00BFFF' }
            },
            {
                key: "A emporter",
                amount: this.state.data != null ? parseFloat(this.state.data["à emporter"][this.state.selection].toFixed(1)) : 0,
                svg: { fill: '#B0E0E6' }
            },
        ]

        const Legend = () =>{
            var yPos = ['-10%', '5%', '20%']
            return data.map( (data, index) => {
                return(
                <Text
                    x={'22%'}
                    y={yPos[index]}
                    alignmentBaseline={'middle'}
                    fill={data.svg.fill}
                    fontSize={16}
                > 
                    {data.key + ' ' + data.amount +'€'}
                 </Text>
                )
            })
        }

        /*const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'red'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'red'}
                        strokeWidth={0.2}
                    >
                        {data.amount+"€"}
                    </Text>
                )
            })
        }*/

        const TextCenter = () =>{
            var sum = 0
            data.map((data) =>{
                sum += data.amount
            })
            return(
                <Text
                    x={'-5%'}
                    alignmentBaseline={'middle'}
                    fill={'#3BB9E0'}
                    fontSize={24}
                > 
                    {sum}
                </Text>)
        }

        return (
                <View>
                    <PieChart
                        style={{ height: 200, marginLeft: "-45%" }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'95%'}
                    >
                        <TextCenter/>
                        <Legend/>
                    </PieChart>
                </View>
        )
    }

    repartitionP(){
        const total = this.state.data != null ? parseFloat(this.state.data["sur place"][this.state.selection].toFixed(1)) + parseFloat(this.state.data["livraison"][this.state.selection].toFixed(1)) + parseFloat(this.state.data["à emporter"][this.state.selection].toFixed(1)) : 0
        const data = [
            {
                key: "Sur place",
                amount: this.state.data != null ? (this.state.data["sur place"][this.state.selection] * 100 / total).toFixed(1) : 0,
                svg: { fill: '#3CA6C6' },
            },
            {
                key: "Livraison",
                amount: this.state.data != null ? (this.state.data["livraison"][this.state.selection] * 100 / total).toFixed(1) : 0,
                svg: { fill: '#00BFFF' }
            },
            {
                key: "A emporter",
                amount: this.state.data != null ? (this.state.data["à emporter"][this.state.selection] * 100 / total).toFixed(1) : 0,
                svg: { fill: '#B0E0E6' }
            },
        ]

        const Legend = () =>{
            var yPos = ['-10%', '5%', '20%']
            return data.map( (data, index) => {
                return(
                <Text
                    x={'22%'}
                    y={yPos[index]}
                    alignmentBaseline={'middle'}
                    fill={data.svg.fill}
                    fontSize={16}
                > 
                    {data.key + ' ' + data.amount +'%'}
                 </Text>
                )
            })
        }

        /*const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'red'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'red'}
                        strokeWidth={0.2}
                    >
                        {data.amount+"€"}
                    </Text>
                )
            })
        }*/

        const TextCenter = () =>{
            return(
                <Text
                    x={'-5%'}
                    alignmentBaseline={'middle'}
                    fill={'#3BB9E0'}
                    fontSize={24}
                > 
                    {total}
                </Text>)
        }

        return (
                <View>
                    <PieChart
                        style={{ height: 200, marginLeft: "-45%" }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'95%'}
                    >
                        <TextCenter/>
                        <Legend/>
                    </PieChart>
                </View>
        )
    }

    render() {
        return(
            <View>
            {this.props.type != "%" ? this.repartitionE() : this.repartitionP()}
            </View>
            )
    }

}

