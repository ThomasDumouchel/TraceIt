import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import CanvasSizingSlider from './CanvasSizingSlider';

const defaultValues = {
    project_name: "project1",
    unit: "metric",
    canvas_height: 30,
    canvas_width: 30,
    img: undefined,
};

const CreateProjectDialog = ({ open, handleCancel, handleCreate }) => {
    const [formValues, setFormValues] = React.useState(defaultValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
      };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setFormValues({
                ...formValues,
                img: { filename: img.name, url: URL.createObjectURL(img) },
            })
        }
    }

    return (
    <Dialog open={open}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter a name for your project
            </DialogContentText>
            {/* Project name */}
            <TextField variant="standard"
                autoFocus
                margin="dense"
                name="project_name"
                label="Project name"
                type="text"
                fullWidth
                value={formValues.project_name}
                onChange={handleInputChange}
            />
            {/* Image file selector */}
            <DialogContentText>
                Select an image you will be copying on your canvas: 
            </DialogContentText>
            <div>
                <Button variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        onChange={handleFileInputChange}
                        hidden
                    />
                </Button>
                {formValues.img ? <span>{formValues.img.filename}</span> : <span>No file selected</span>}
            </div>
            
            {/* Prefered unit radio button */}
            <DialogContentText>
                Select the unit you will be working with: 
            </DialogContentText>
            <div>
                <FormControl>
                    <RadioGroup row
                        name="unit"
                        value={formValues.unit}
                        onChange={handleInputChange}
                    >
                        <FormControlLabel key="metric" 
                            value="metric" 
                            control={<Radio />} 
                            label="Metric" 
                        />
                        <FormControlLabel key="imperial" 
                            value="imperial"
                            control={<Radio />} 
                            label="Imperial" 
                        />
                    </RadioGroup>
                </FormControl>
            </div>
            {/* Canvas width and height */}
            <DialogContentText>
                Enter the width of your canvas: 
            </DialogContentText>
            <CanvasSizingSlider name="canvas_width" value={formValues.canvas_width} handleInputChange={handleInputChange} unit={formValues.unit} />
            <DialogContentText>
                Enter the height of your canvas: 
            </DialogContentText>
            <CanvasSizingSlider name="canvas_height" value={formValues.canvas_height} handleInputChange={handleInputChange} unit={formValues.unit} />

            
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleCancel }>Cancel</Button>
            <Button onClick={ () => handleCreate({ ...formValues, img_link: formValues.img.url }) }>Create</Button>
        </DialogActions>
    </Dialog>
    );
}

export default CreateProjectDialog;
