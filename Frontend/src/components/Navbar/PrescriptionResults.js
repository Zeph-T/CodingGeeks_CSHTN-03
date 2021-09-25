import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import PrescriptionItem from "./PrescriptionItem";
import { Typography } from "@mui/material";

const PrescriptionResult = (props) => {
    const array = [
            {
                "_id": "614cb6c7117e0b19d9f4798c",
                "name": "Accu Chek Combo Pack of Instant Wireless Blood Glucose Monitoring System with 10 Strip Free & Accu Chek Instant 50 Strip",
                "type": "combo pack of 3 units",
                "category": "Diabetes Monitor , Test Strip & Lancets , Health Conditions , Accu-chek , Blood Glucose Monitors , Diabetes , Devices",
                "manufacturer": "Roche Diabetes Care India Pvt Ltd",
                "cost": 2524,
                "qty": 25,
                "__v": 1,
                "categories": [
                    "DiabetesMonitor",
                    "TestStrip&Lancets",
                    "HealthConditions",
                    "Accu-chek",
                    "BloodGlucoseMonitors",
                    "Diabetes",
                    "Devices"
                ],
                "score": 0.8333333333333334
            },
            {
                "_id": "614cb6c7117e0b19d9f47656",
                "name": "1Mile Healthcare Doctor Plus Stethoscope",
                "type": "box of 1 Unit",
                "category": "Doctor's Corner",
                "manufacturer": "1Mile Healthcare",
                "cost": 1599,
                "qty": 25,
                "__v": 1,
                "categories": [
                    "Doctor'sCorner"
                ],
                "score": 0.6
            },
            {
                "_id": "614cb6c9117e0b19d9f47aa5",
                "name": "Activkids Immuno Booster Choco Bites (2 3 Yrs)",
                "type": "packet of 7 bars",
                "category": "Health Food and Drinks , Immunity Boosters , Healthy Snacks",
                "manufacturer": "Cipla Health Ltd",
                "cost": 9,
                "qty": 25,
                "__v": 1,
                "categories": [
                    "HealthFoodandDrinks",
                    "ImmunityBoosters",
                    "HealthySnacks"
                ],
                "score": 0.5625
            }]

    return (
        <div>
            <Typography variant ='h6'> Identified Medicines</Typography>
            <Grid container spacing={20} md={9} style={{marginLeft:'7rem', marginTop: '1rem', marginBottom:'1rem'}} >
                {props.results.map((item) => {
                    return <PrescriptionItem product={item} {...props} />
                })}
            </Grid>
        </div>
    );
};

export default PrescriptionResult;

