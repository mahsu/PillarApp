import React from 'react'
import {Content, View} from "native-base";
import {Calendar} from "react-native-calendars";
import PaddedContainer from "../components/visual/PaddedContainer";
import MainTitle from "../components/visual/MainTitle";
import moment from 'moment';

const initialMarked = {
    '2018-05-01': {marked: true},
    '2018-05-02': {marked: true, },
    '2018-05-04': {marked: true,},
    '2018-04-30': {marked: true},
    '2018-04-29': {disabled: true,}
};

export default class ScheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '2018-05-04',
            markedDates: {...initialMarked}
        }
    }

    render() {
        return (
            <PaddedContainer>
                <Content>
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
            </PaddedContainer>
        );
    }

}