

import React from 'react';
import {DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


 const Toolbar = (props)=>{
   
       const goToBack = () => {
            console.log(props)
          let mDate = props.date;
          let newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth() - 1,
            1); 
          
          props.setDate(newDate)
        }
       const  goToNext = () => {
          let mDate = props.date;
          let newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth() + 1,
            1);
          console.log(newDate)
       
          props.setDate(newDate)
          }

       const setDateChange = (d)=>{
         var str = d+""
         var arr = str.split(" ")
         var month = arr[1]+""
         var m;
         switch(month) {
            case "Jan":
             m = 0
              break;
            case "Feb":
             m = 1
              break;
            case "Mar":
             m = 2
               break;
            case "Apr":
             m=3
               break;
            case "May":
             m=4
               break;
            case "Jun":
             m=5
               break;
            case "Jul":
             m=6   
               break;
            case "Aug":
             m=7   
               break;
            case "Sep":
             m=8
               break;
            case "Oct":
             m=9   
               break;
            case "Nov":
             m=10
               break;                                                  
            default:
              m=11   
          }
          console.log(m) 
         var year = Number(arr[3])
         var d = new Date(year,m,Number(arr[2]))
         props.setDate(d)
       }   
        return (
          <div className="toolbar-container">
            <div className="navigation-buttons">
              <button className="btn btn-back" onClick={goToBack}>
              prev
              </button>
              <button className="btn btn-next" onClick={goToNext}>
              next
              </button>
              <label className='label-date'>{props.label}</label>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
        variant="inline"
        label="Select"
        value={props.date}
        onChange={setDateChange}
        minDate={new Date()}
      />
      </MuiPickersUtilsProvider>
          </div>
        );
}

export default Toolbar