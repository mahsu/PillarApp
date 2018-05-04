import React from 'react'
import {Content, H3, Text, View} from "native-base";
import {Calendar} from "react-native-calendars";
import PaddedContainer from "../components/visual/PaddedContainer";
import MainTitle from "../components/visual/MainTitle";
import moment from 'moment';
import FeelingsCard from "../components/FeelingsCard";

const initialMarked = {
    '2018-05-01': {marked: true},
    '2018-05-02': {marked: true,},
    '2018-05-03': {marked: true,},
    '2018-05-04': {marked: true,},
    '2018-04-30': {marked: true},
    '2018-04-29': {disabled: true,}
};

const events = {
    '2018-05-01': [
        {
            time: "9 AM",
            isHappy: false,
            notes: "Slight dizziness, needed to lie down."
        },
        {
            time: "3 PM",
            isHappy: true,
            notes: "Medication working as expected."
        },
        {
            time: "9 PM",
            isHappy: true,
            notes: ""
        }
    ],
    '2018-05-02': [
        {
            time: "9 AM",
            isHappy: true,
            notes: ""
        },
        {
            time: "3 PM",
            isHappy: true,
            notes: ""
        },
        {
            time: "3:30 PM",
            isHappy: false,
            notes: "Slight dizziness"
        },
        {
            time: "9 PM",
            isHappy: false,
            notes: "Stomach Discomfort"
        }
    ],
    '2018-05-03': [
        {
            time: "9 AM",
            isHappy: false,
            notes: "Dizziness that went away with breakfast"
        },
        {
            time: "3 PM",
            isHappy: true,
            notes: ""
        },
        {
            time: "9 PM",
            isHappy: true,
            notes: ""
        }
    ],
    '2018-05-04': [
        {
            time: "9 AM",
            isHappy: true,
            notes: ""
        },
        {
            time: "3 PM",
            isHappy: false,
            notes: "Drowsiness"
        },
        {
            time: "9 PM",
            isHappy: true,
            notes: ""
        }
    ]
};

function sortTimes(times) {
    return times.sort((a, b) => {
        return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
    });
}

export default class ScheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '2018-05-04',
            markedDates: {...initialMarked}
        }
    }

    render() {
        let selectedDayEvents = events[this.state.selected];
        let selectedMoment = moment(this.state.selected).format("MMM D, YYYY");
        return (
            <PaddedContainer>
                <Content scrollEnabled={false} style={{paddingBottom: 10}}>
                    <MainTitle>Schedule</MainTitle>
                    <Calendar
                        // Initially visible month. Default = Date()
                        //current={'2012-03-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2012-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2020-05-30'}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {
                            let selected = day.dateString;
                            this.setState({
                                selected,
                                markedDates: {
                                    ...this.state.markedDates,
                                    [this.state.selected]: {
                                        ...this.state.markedDates[this.state.selected],
                                        disableTouchEvent: false,
                                        selected: false
                                    },
                                    [selected]: {
                                        ...this.state.markedDates[selected],
                                        selected: true,
                                        disableTouchEvent: true
                                    }
                                }
                            });
                            console.log(day.dateString);
                            console.log('selected day', day)
                        }}
                        markedDates={this.state.markedDates}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {
                            console.log('selected day', day)
                        }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMM yyyy'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {
                            console.log('month changed', month)
                        }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        //renderArrow={(direction) => (<Arrow/>)}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={false}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                    />
                </Content>
                <Content>
                    <View style={{
                        paddingTop: 15,
                        paddingLeft: 10
                    }}>
                        <H3>{selectedMoment}</H3>
                        {selectedDayEvents && selectedDayEvents.length > 0
                            ? <Text style={{paddingTop: 2, paddingBottom: 10}}>Here are your recorded events:</Text>
                            : <View/>}

                    </View>
                    {selectedDayEvents
                        ? (selectedDayEvents.length > 0
                                ? sortTimes(selectedDayEvents).map((item, index) => {
                                    return (<FeelingsCard key={index} data={item}/>);
                                })
                                : (<Text style={{paddingLeft: 10, paddingTop: 2}}>No events for the selected day.</Text>)
                        )
                        : (<Text style={{paddingLeft: 10, paddingTop: 2}}>No events for the selected day</Text>)}
                </Content>
            </PaddedContainer>
        );
    }

}