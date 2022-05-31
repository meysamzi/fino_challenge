import { Fragment, useState, useRef } from "react";
import { Button, Card, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [users, setUsers] = useState([]);
  const input_ref = useRef(null)
  const users_fetch = async () => {
    const res = await fetch("https://reqres.in/api/users");
    const json = await res.json();
    setUsers(json.data);
  }
  const users_fetch_by_name = async () => {
    const res = await fetch("https://reqres.in/api/users");
    const json = await res.json();
    let text_input = input_ref.current.value
    const selected_user = json.data.find(users_check => users_check.first_name == text_input)
    setUsers((prev) => [...prev, selected_user])
    console.log(selected_user)
  }
  const users_delete = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const new_users = users.filter(check => check.id !== id)
      setUsers(new_users)
    })
  }
  return (
    <Fragment>
      <h2>A list of users</h2>
      <input ref={input_ref} type='text'/>
      <div className="btn_container">
        <Button variant="contained" onClick={users_fetch}>Get all users</Button>
        <Button variant="contained" onClick={users_fetch_by_name}>Get users by name</Button>
      </div>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ paddingTop: 0, paddingLeft: 15, paddingRight: 15, marginTop: 2 }}
      >
        {users.length >= 0 &&
          users.map((user) => {
            return (
              <Grid item xs={4} key={user.id}>
                <Card elevation={4}
                  sx={{ display: 'grid', rowGap: 4, justifyItems: 'center', paddingTop: 2, paddingBottom: 2 }}>
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} />
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => users_delete(user.id)}>
                    Delete
                  </Button>
                </Card>
              </Grid>
            )
          })}
      </Grid>
    </Fragment >
  );
}

export default App;
