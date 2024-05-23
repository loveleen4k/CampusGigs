import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import ApplicationsList from './UserAppsApi';
import UserJobList from './UserJobs';



function Profile() {
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0]; 
    useEffect(() => {
        if (!user.email) {
           window.location.href='/login'; 
           return;
        }
    },[user]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/'; 
    };

    
    
    

    return (
        <>
            <h1 className="heading">Welcome {user.name}</h1>
            {user && (
                
                    <Card className="mb-3"
          bg="dark"
          text="white">
                    <Card.Body >
                        <Card.Title>Profile Information</Card.Title>
                        <ListGroup>
                            <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
                            {user.jobPreferences && (
                                <ListGroup.Item><strong>Job Preferences:</strong> {user.jobPreferences.join(', ')}</ListGroup.Item>
                            )}
                            {user.skills && (
                                <ListGroup.Item><strong>Skills:</strong> {user.skills.join(', ')}</ListGroup.Item>
                            )}
                        </ListGroup>
                        <div className="mt-3">
                            <Button variant="dark" className="buttons" onClick={handleLogout} >Logout</Button>{' '}
                            <Button variant="info" className="buttons" as={Link} to={'/updateProfile'}>Update Profile</Button>
                        </div>
                        <ListGroup  className="list-group-flush">
                        <h5 className="mt-3">Your Application:</h5>
                        <ApplicationsList/>
                        <Button className='buttons' variant="dark" as={Link} to={"/jobs"}>search for jobs</Button>
                        </ListGroup>
                        <ListGroup  className="list-group-flush">
                        <h5 className="mt-3">Your Job Listings:</h5>
                        <UserJobList/>
                        <Button className='buttons' variant="dark" as={Link} to={"/hire"}>create a job listing</Button>
                        </ListGroup>
                    </Card.Body>
                    </Card>
                
            )}
        </>
    );
}

export default Profile;
