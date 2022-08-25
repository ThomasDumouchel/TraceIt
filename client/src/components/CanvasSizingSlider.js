import React from 'react';
import Slider from '@mui/material/Slider';


const CanvasSizingSlider = ({ name, value, handleInputChange, unit }) => {
    return (
    <div style={{display: 'flex'}}>
        <Slider
            size="small"
            name={name}
            value={value}
            onChange={handleInputChange}
            valueLabelDisplay="auto"
        />
        { unit === "metric"? <span>cm</span> : <span>inches</span> }
    </div>
    );
}

export default CanvasSizingSlider;
