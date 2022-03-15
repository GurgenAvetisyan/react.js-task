import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Loading from '../../components/Loading';
import UserDeleteDialog from '../../components/UserDeleteDialog';
import UseEditDialog from '../../components/UseEditDialog';
import UseAddDialog from '../../components/UseAddDialog';

const CancelToken = axios.CancelToken;

export default function UserList() {
  const Navigate = useNavigate();
  const [users, setUsers] = useState({
    data: [],
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setUsers(prevState => {
      return { ...prevState, page: newPage + 1 };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    Navigate('/login');
  };

  useEffect(() => {
    const source = CancelToken.source();
    setLoading(true);
    let ignor = false;
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `https://reqres.in/api/users?page=${users.page}`,
          {
            cancelToken: source.token,
          },
        );
        if (!ignor) setUsers(res.data);
      } catch (e) {
        if (axios.isCancel(e)) {
        } else {
        }
      } finally {
        if (!ignor) setLoading(false);
      }
    };
    getUsers();
    return () => {
      ignor = true;
      source.cancel();
    };
  }, [users.page]);

  if (loading) return <Loading />;

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleLogout}>
        Logout
      </Button>
      <UseAddDialog {...{ setUsers }} />

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map(user => {
              const { id, first_name, last_name, avatar, email, job, name } =
                user;
              return (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    <Link to={`/users/${id}`}>
                      <Avatar alt={first_name} src={avatar} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/users/${id}`}>
                      {name ? name : `${first_name} ${last_name}`}
                    </Link>
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{job ? job : 'does not work'}</TableCell>
                  <TableCell>
                    <UserDeleteDialog {...{ user, setUsers }} />
                  </TableCell>
                  <TableCell>
                    <UseEditDialog {...{ user, setUsers }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6]}
        component='div'
        count={users.total}
        rowsPerPage={users.data.length}
        page={users.page - 1}
        onPageChange={handleChangePage}
      />
    </>
  );
}
