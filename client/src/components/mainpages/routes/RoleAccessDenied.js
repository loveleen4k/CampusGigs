import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { ROLE_ACCESS_MESSAGES } from '../../../constants/userRoles.js';

const RoleAccessDenied = ({ action }) => {
    const message = ROLE_ACCESS_MESSAGES[action];

    if (!message) {
        return (
            <Container className="access-panel">
                <div className="panel">
                    <p className="notice notice-error mb-3">You do not have permission to access this page.</p>
                    <Button as={Link} to="/Profile" variant="dark" className="buttons">Go to Profile</Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="access-panel">
            <div className="panel">
                <section className="heading">{message.title}</section>
                <p className="notice mb-4">{message.body}</p>
                <Button
                    as={Link}
                    to="/Profile"
                    state={{ roleAction: action, suggestedRole: message.suggestedRole }}
                    variant="dark"
                    className="buttons"
                >
                    Switch role in Profile
                </Button>
                <Button as={Link} to="/" variant="outline-light" className="buttons">
                    Go back home
                </Button>
            </div>
        </Container>
    );
};

export default RoleAccessDenied;
