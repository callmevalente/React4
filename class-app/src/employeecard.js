import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Fade from "@mui/material/Fade";
import Grow from '@mui/material/Grow';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function EmployeeCard(props) {
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [deleteCheck, setDeleteCheck] = React.useState(false);
    const [deleteAlertVisibility, setDeleteAlertVisibility] = React.useState(false);
    const [id, setId] = React.useState(props.employee.id)
    const [ogId] = React.useState(props.employee.id)
    const [name, setName] = React.useState(props.employee.name)
    const [title, setTitle] = React.useState(props.employee.title)
    const [avatar, setAvatar] = React.useState(props.employee.avatarurl)
    const [avatarDisplay, setAvatarDisplay] = React.useState(props.employee.avatarurl)
    const [alertVisibility, setAlertVisibility] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState('');

    const deleteUser = () => {
        if (deleteCheck) {
            fetch(`/delete/${id}`, {
                method: "DELETE"
            })
            props.refresh()
            props.messageEdit("success", "The employee entry was successfully deleted!", 2)
        } else {
            setDeleteAlertVisibility(true)
        }
        
    }

    const save = () => {
        if(!(isNaN(id)) && 
        id > 0 && 
        name !== "" && 
        name.length < 25 &&
        title !== "" &&
        title.length < 25 &&
        avatar !== "") {
            let safeName = name.replace("'","''");
            let safeTitle = title.replace("'","''");
            let safeAvatar = avatar.replace("'","''");
            fetch(`/update/${ogId}/${id}/${safeName}/${safeTitle}/${encodeURIComponent(safeAvatar)}`, {
                method: "PUT"
            })
            handleClose()
            props.messageEdit("success", "The employee entry was successfully updated!", 1)
        }else{
            setAlertContent("The employee ID entered is not valid.")
            setAlertVisibility(true)
        }
    }

    const generateAvatar = () => {
        if (!(isNaN(id)) && id > 0) {
            setAvatar(`https://api.dicebear.com/6.x/notionists/svg?seed=${id}`)
            setAvatarDisplay(`https://api.dicebear.com/6.x/notionists/svg?seed=${id}`)
        }else{
            setAlertContent('You must enter a valid employee ID before generating Avatar!')
            setAlertVisibility(true)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setDeleteCheck(false);
        setDeleteOpen(false);
    };

    const handleDeleteCheck = () => {
       setDeleteCheck(!deleteCheck)
    }

    const changingId = (input) => {
        setId(input.target.value);
    }

    const changingName = (input) => {
        setName(input.target.value);
    }

    const changingTitle = (input) => {
        setTitle(input.target.value);
    }

    const changingAvatar = (input) => {
        setAvatar(input.target.value);
        setAvatarDisplay(input.target.value)
    }

    return (
        <div className="card">
            <img 
                src={avatar} 
                alt="Avatar" 
                width="240px" 
            />
            <div className="container">
                <p>{name}</p>
                <p>Employee ID: {id}</p>
                <p>{title}</p>
                <div className='cardButtons'>
                    <EditSharpIcon style={{cursor: 'pointer'}} fontSize='large' sx={{ color: '#010A26' }} onClick={handleClickOpen}/>
                    <DeleteIcon style={{cursor: 'pointer'}} fontSize='large' sx={{ color: '#bd2014' }} onClick={handleDeleteOpen}/>
                </div>
                <Dialog open={open} onClose={handleClose} TransitionComponent={Grow} transitionDuration={1000}>
                    <DialogTitle>Edit the employee:</DialogTitle>
                    <div className='dialogBody'>
                        <DialogContent className='cardForm'>
                            <DialogContentText>
                                <i>Fill the following form to populate employee card:</i>
                            </DialogContentText>
                            <TextField
                                margin="dense"
                                id="employeeId"
                                label="Employee ID:"
                                type="number"
                                fullWidth
                                variant="standard"
                                defaultValue={id}
                                onChange={changingId}
                            />
                            <TextField
                                margin="dense"
                                id="employeeName"
                                label="Employee Name:"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={name}
                                onChange={changingName}
                            />
                            <TextField
                                margin="dense"
                                id="employeeTitle"
                                label="Employee Title:"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={title}
                                onChange={changingTitle}
                            />
                            <TextField
                                margin="dense"
                                id="employeeAvatar"
                                label="Employee Avatar:"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={avatar}
                                onChange={changingAvatar}
                            />
                            <Button onClick={generateAvatar}>Generate Randon Avatar</Button>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={save}>Submit</Button>
                            </DialogActions>
                        </DialogContent>
                        <div>
                            <div className="cardEdit">
                                <img 
                                    src={avatarDisplay} 
                                    alt="Avatar" 
                                    width="240px" 
                                />
                                <div className="containerEdit">
                                    <p>{name}</p>
                                    <p>Employee ID: {id}</p>
                                    <p>{title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Fade
                        in={alertVisibility} //Write the needed condition here to make it appear
                        timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                        addEndListener={() => {
                            setTimeout(() => {
                            setAlertVisibility(false)
                            }, 4000);
                        }}
                        style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 999 }}
                        >
                        <Alert severity='error'>{alertContent}</Alert>
                    </Fade>
                </Dialog>
            </div>
            <Dialog
                open={deleteOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Delete employee from the database?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you wish to delete {name} from our employee database?
                </DialogContentText>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox />} 
                        label="Check this box to confirm that you wish to delete this employee."
                        checked={deleteCheck}
                        onChange={handleDeleteCheck} />
                </FormGroup>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDelete}>Cancel</Button>
                <Button onClick={deleteUser} autoFocus>
                    DELETE
                </Button>
                </DialogActions>
                <Fade
                        in={deleteAlertVisibility} //Write the needed condition here to make it appear
                        timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                        addEndListener={() => {
                            setTimeout(() => {
                            setDeleteAlertVisibility(false)
                            }, 4000);
                        }}
                        style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 999 }}
                        >
                        <Alert severity='error'>You must check the box to confirm the deletion.</Alert>
                    </Fade>
            </Dialog>
        </div>
    );
}