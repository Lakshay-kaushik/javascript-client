/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, RemoveDialog } from './components/index';
import { TableComponent } from '../../components/Table';
// import trainees from './data/trainee';
import callApi from '../../libs/utils/api';
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
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
      items: [],
      count: 0,
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

    handleSort = (field) => () => {
      const { order } = this.state;
      this.setState({
        orderBy: field,
        order: order === 'asc' ? 'desc' : 'asc',
      });
    }

    handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage,
      
    },this.traineedata);
    };

    traineedata = () =>{
        const { page, rowsPerPage, } = this.state;
        this.setState({ isLoaded: true });  
        const value = this.context;
        console.log('val :', value);
        // eslint-disable-next-line consistent-return
        callApi({}, 'get', `/trainee?skip=${page*rowsPerPage}&limit=${rowsPerPage}`).then((response) => {
          console.log('response compo', response);
          if (response.data === undefined) {
            this.setState({
              isLoaded: false,
            }, () => {
            });
          } else {
            console.log('res inside traineelist :', response);
            const data = response.data;
            console.log('records are :', data);
            this.setState({ items: data.records, isLoaded: false, count: data.count });
            return response;
          }
        });
    }

    componentDidMount = () => {
        this.traineedata();
    }

    render() {
      const {
        EditOpen, Open, order, orderBy, page, rowsPerPage, editData, DeleteOpen, deleteData,
        items, isLoaded, count,
      } = this.state;
      const { classes } = this.props;
      console.log('items', items);
      console.log('deleted data:',deleteData)
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
              databs={this.traineedata}
            />
          </div>
          <EditDialog
            onClose={this.handleEditButton}
            open={EditOpen}
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
            data={items}
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
            onChangePage={this.handleChangePage}
          />
        </>
      );
    }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
