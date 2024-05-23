import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GlobalState } from '../../../GlobalState';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const UpdateProfileContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
`;

function UpdateProfile() {
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0];

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [location, setLocation] = useState(user?.location || '');
    const [contactInfo, setContactInfo] = useState(user?.contactInfo || '');
    const [jobPreferences, setJobPreferences] = useState(user?.jobPreferences?.join(', ') || '');
    const [skills, setSkills] = useState(user?.skills?.join(', ') || '');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('accessToken');
            const updatedUser = {
                name,
                email,
                location,
                contactInfo,
                jobPreferences: jobPreferences ? jobPreferences.split(',').map(pref => pref.trim()) : [],
                skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
            };

            const response = await axios.put('http://localhost:5000/user/update', updatedUser, {
                headers: {
                    Authorization: authToken,
                },
            });
            console.log(response.data);

            if (response.status === 200) {
                alert('Profile updated successfully!');
                window.location.href = '/';
            } else {
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <UpdateProfileContainer>
            <h2 className='heading'>Update Profile</h2>
            <Form variant="dark" onSubmit={handleUpdateProfile}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formContactInfo">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your contact info"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formJobPreferences">
                    <Form.Label>Job Preferences</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your job preferences (comma-separated)"
                        value={jobPreferences}
                        onChange={(e) => setJobPreferences(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formSkills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your skills (comma-separated)"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </Form.Group>

                <Button className='buttons' variant="Primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </UpdateProfileContainer>
    );
}

export default UpdateProfile;
