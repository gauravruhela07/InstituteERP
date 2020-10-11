import React from 'react';
import Button from 'react-bootstrap/Button';


const HomePage = () => {
    return (
        <div>
            <h1>This Is HomePage</h1>
            <Button href='/student/login'>Student</Button>
            <br></br>
            <Button href='/admin'>Admin</Button>
            <br></br>
            <Button href='/faculty'>Faculty</Button>
        </div>
    );
}

export default HomePage;