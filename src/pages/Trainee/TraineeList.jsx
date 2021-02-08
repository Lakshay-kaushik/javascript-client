/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, RemoveDialog } from './components/index';
import { TableComponent } from '../../components/Table';
import trainees from './data/trainee';
import { graphql } from '@apollo/react-hoc';
import { GET_TRAINEE } from './query';
import Compose from 'lodash.flowright'
// import callApi from '../../libs/utils/api';
import { MyContext } from '../../contexts/index';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';

const useStyles = (theme) => ({
  traineeButton: {
    marginRight: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Open: false,
      EditOpen: false,
      DeleteOpen: false,
      selected: '',
      orderBy: '',
      order: '',
      page: 0,
      rowsPerPage: 5,
      editData: {},
      deleteData: {},
      isLoaded: false,
    };
  }

    handleEditButton = (data) => {
      this.setState({ EditOpen: false }, () => { console.log('Edited Item ', data); });
    }

    handleDeleteButton = (data) => {
      this.setState({ DeleteOpen: false }, () => { console.log('Deleted Item ', data.data); });
    };

    handleUser = (status, data) => {
      this.setState({ Open: status }, () => { console.log(data); });
    };

    handleClose = () => {
      this.setState({ Open: false });
    }

    handleEditDialogOpen = (data) => {
      this.setState({ EditOpen: true, editData: data });
    }

    handleSelect = (event, data) => {
      this.setState({ selected: event.target.value }, () => console.log(data, this.state));
    };

    handleRemoveDialogOpen = (data) => {
      this.setState({ DeleteOpen: true, deleteData: data });
    }

    handleEdit = (name,email) => {
      this.setState({
        EditOpen: false,
      });
      console.log('Edited Item :', { name, email });
    };

    handleSort = (field) => () => {
      const { order } = this.state;
      this.setState({
        orderBy: field,
        order: order === 'asc' ? 'desc' : 'asc',
      });
    }

    handleChangePage = (refetch) => (event, newPage) => {
      const { rowsPerPage } = this.state;
      this.setState({
        page: newPage,
    }, () => {
      refetch({ skip: newPage * (rowsPerPage.length), limit: rowsPerPage.length });
    });
    };
    
    render() {
      const {
        EditOpen, Open, order, orderBy, page, rowsPerPage, editData, DeleteOpen, deleteData,
      } = this.state;
      const { classes } = this.props;
      const{
        data: {
          getAllTrainees: { records = [], count = 0 } ={},
          refetch, 
        },
      } = this.props;
      console.log('TraineeData:', this.props);
      return (
        <>
          <div className={classes.dialog}>
            <Button className={classes.traineeButton} variant="outlined" color="primary" onClick={() => this.setState({ Open: true })}>
              ADD TRAINEELIST
            </Button>
            <AddDialog
              onClose={this.handleClose}
              open={Open}
              onSubmit={this.handleUser}
              refetch = { refetch }
              databs={this.traineedata}
            />
          </div>
          <EditDialog
            onClose={this.handleEditButton}
            open={EditOpen}
            handleEdit={this.handleEdit}
            onSubmit={this.handleEditButton}
            data={editData}
            dtbs={this.traineedata}
          />
          <RemoveDialog
            data={deleteData}
            onClose={this.handleDeleteButton}
            onSubmit={this.handleDeleteButton}
            open={DeleteOpen}
            database={this.traineedata}
          />
          <TableComponent
            id="id"
            data={records}
            columns={[
              {
                field: 'name',
                lable: 'Name',
              },
              {
                field: 'email',
                lable: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                lable: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]}
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleRemoveDialogOpen,
              },
            ]}
            orderBy={orderBy}
            order={order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.handleChangePage(refetch, count)}
          />
        </>
      );
    }
}

TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose(withStyles(useStyles),
graphql(GET_TRAINEE, {
  options: { variables: { skip: 0, limit: 10}}
}))(TraineeList);
