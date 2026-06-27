import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import ApplicationsList from './UserAppsApi';
import UserJobList from './UserJobs';
import {
    EMPLOYER,
    STUDENT_EMPLOYEE,
    USER_ROLES,
    ROLE_LABELS,
    ROLE_ACCESS_MESSAGES,
    getEffectiveRole,
    getOtherRole,
} from '../../../constants/userRoles.js';



function Profile() {
    const location = useLocation();
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0];
    const setUser = userApi.user[1];
    const refetch = userApi.refetch;
    const role = getEffectiveRole(user.role);
    const [selectedRole, setSelectedRole] = useState(getOtherRole(role));
    const [roleError, setRoleError] = useState('');
    const [roleSuccess, setRoleSuccess] = useState('');
    const [switchingRole, setSwitchingRole] = useState(false);
    const [accessNotice, setAccessNotice] = useState(null);

    useEffect(() => {
        if (!user.email) {
           window.location.href='/login'; 
           return;
        }
    },[user]);

    useEffect(() => {
        setSelectedRole(getOtherRole(role));
    }, [role]);

    useEffect(() => {
        if (location.state?.roleAction) {
            const notice = ROLE_ACCESS_MESSAGES[location.state.roleAction];
            if (notice) {
                setAccessNotice(notice);
            }
            if (location.state.suggestedRole) {
                setSelectedRole(location.state.suggestedRole);
            }
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/'; 
    };

    const handleRoleSwitch = async (e) => {
        e.preventDefault();
        setRoleError('');
        setRoleSuccess('');

        if (selectedRole === role) {
            setRoleError('Please select a different role to switch.');
            return;
        }

        setSwitchingRole(true);
        try {
            const authToken = localStorage.getItem('accessToken');
            const res = await axios.put(
                'http://localhost:5000/user/role',
                { role: selectedRole },
                { headers: { Authorization: authToken } }
            );
            setUser(res.data.user);
            setRoleSuccess(res.data.msg);
            setAccessNotice(null);
            if (refetch) refetch();
        } catch (err) {
            const msg = err.response?.data?.msg || 'Failed to update role. Please try again.';
            setRoleError(msg);
        } finally {
            setSwitchingRole(false);
        }
    };

    return (
        <>
            <h1 className="heading">Welcome {user.name}</h1>
            {user && (
                <Card className="mb-3 mx-auto" bg="dark" text="white" style={{ maxWidth: '640px' }}>
                    <Card.Body>
                        {accessNotice && (
                            <div className="notice mb-3">
                                <strong>{accessNotice.title}</strong>
                                <p className="mb-0 mt-1">{accessNotice.body}</p>
                            </div>
                        )}

                        <div className="panel mb-3">
                            <p className="section-label">Profile</p>
                            <p className="mb-1"><span style={{ color: 'rgba(255,255,255,0.5)' }}>Email</span> · {user.email}</p>
                            <p className="mb-1"><span style={{ color: 'rgba(255,255,255,0.5)' }}>Role</span> · {ROLE_LABELS[role]}</p>
                            {user.jobPreferences && (
                                <p className="mb-1"><span style={{ color: 'rgba(255,255,255,0.5)' }}>Preferences</span> · {user.jobPreferences.join(', ')}</p>
                            )}
                            {user.skills && (
                                <p className="mb-0"><span style={{ color: 'rgba(255,255,255,0.5)' }}>Skills</span> · {user.skills.join(', ')}</p>
                            )}
                        </div>

                        <div className="panel mb-3" id="switch-role">
                            <p className="section-label">Switch role</p>
                            <p className="empty-text mb-3">
                                {role === EMPLOYER
                                    ? 'Delete all job listings before switching to Student / Employee.'
                                    : 'Delete all applications before switching to Employer.'}
                            </p>
                            <Form onSubmit={handleRoleSwitch} className="d-flex flex-wrap align-items-end gap-2">
                                <Form.Group controlId="profileRoleSelect" className="flex-grow-1" style={{ minWidth: '180px' }}>
                                    <Form.Select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        style={{ background: 'var(--bg)', color: 'white', border: 'var(--border)' }}
                                    >
                                        {USER_ROLES.filter((r) => r !== role).map((userRole) => (
                                            <option key={userRole} value={userRole}>
                                                {ROLE_LABELS[userRole]}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="buttons m-0"
                                    disabled={switchingRole || selectedRole === role}
                                >
                                    {switchingRole ? 'Switching...' : 'Switch'}
                                </Button>
                            </Form>
                            {roleError && <div className="notice notice-error mt-3 mb-0">{roleError}</div>}
                            {roleSuccess && <div className="notice notice-success mt-3 mb-0">{roleSuccess}</div>}
                        </div>

                        <div className="d-flex flex-wrap">
                            <Button variant="dark" className="buttons" onClick={handleLogout}>Logout</Button>
                            <Button variant="dark" className="buttons" as={Link} to={'/updateProfile'}>Update Profile</Button>
                        </div>

                        {role === STUDENT_EMPLOYEE && (
                            <>
                                <p className="section-label">Applications</p>
                                <ApplicationsList onApplicationsChanged={refetch}/>
                                <Button className="buttons" variant="dark" as={Link} to="/jobs">Browse jobs</Button>
                            </>
                        )}

                        {role === EMPLOYER && (
                            <>
                                <p className="section-label">Job listings</p>
                                <UserJobList onJobsChanged={refetch}/>
                                <Button className="buttons" variant="dark" as={Link} to="/hire">Post a job</Button>
                            </>
                        )}
                    </Card.Body>
                </Card>
            )}
        </>
    );
}

export default Profile;
