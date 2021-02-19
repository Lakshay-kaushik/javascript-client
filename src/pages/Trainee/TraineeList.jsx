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
import { Mutation } from '@apollo/react-components';
import { UPDATE_TRAINEE, DELETE_TRAINEE, CREATE_TRAINEE } from './mutation';
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

    handleClickOpen = () => {
      this.setState({ Open: true });
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

    createData = async (data, openSnackBar, createTrainee) => {
      try {
        const { name, email, password } = data;
        await createTrainee({ variables: { name, email, password } });
        this.setState(
          {
            open: false
          },
          () => {
            openSnackBar("Trainee Created Successfully", "success");
          }
        );
      } catch (err) {
        console.log("err :", err);
        this.setState(
          {
            open: false
          },
          () => {
            openSnackBar("Error While Creating", "error");
          }
        );
      }
    };
  
    editData = async (data, openSnackBar, updateTrainee) => {
      try {
        const { name, email, id } = data;
        await updateTrainee({ variables: { name, email, id } });
        this.setState(
          {
            EditOpen: false
          },
          () => {
            openSnackBar("Trainee Updated Successfully", "success");
          }
        );
      } catch (err) {
        console.log("err :", err);
        this.setState(
          {
            open: false
          },
          () => {
            openSnackBar("Error While Updating", "error");
          }
        );
      }
    };

    deleteData = async (data, openSnackBar, deleteTrainee) => {
      try {
        const { originalId } = data;
        await deleteTrainee({ variables: { originalId } });
        this.setState(
          {
            RemoveOpen: false
          },
          () => {
            openSnackBar("Trainee Deleted Successfully", "success");
          }
        );
      } catch (err) {
        console.log("err :", err);
        this.setState(
          {
            open: false
          },
          () => {
            openSnackBar("Error While Deleting", "error");
          }
        );
      }
    };
  
    handleEdit = (name,email) => {
      this.setState({
        EditOpen: false,
      });
      console.log('Edited Item :', { name, email });
    };

    handleRemoveClose = () => {
      this.setState({
        RemoveOpen: false
      })
    }

    handleEditClose = () => {
      this.setState({
        EditOpen: false
      })
    }

    handleRemove = () => {
      this.setState({
        RemoveOpen: false
      })
    }

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
      refetch({ skip: newPage * (rowsPerPage), limit: rowsPerPage });
    });
    };
    
    render() {
      const {
        EditOpen, Open, order, orderBy, page, rowsPerPage, editData, DeleteOpen, deleteData, refetchData,
      } = this.state;
      const { classes } = this.props;
      const { loader, dataLength, setdataLength, setloader } = this.props;
      const{
        data: {
          getAllTrainees: { records = [], count = 0, totalCount } ={},
          refetch, 
        },
      } = this.props;
      const variables = {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
        sort: 'name'
      };
    //   const updatedCount = refetchData.count ? refetchData.count : count;
    // const updatedData = refetchData.data ? refetchData.data : data;
    // const updatedTotalCount = refetchData.totalCount || totalCount;
      console.log('TraineeData:', this.props);
      // if (updatedCount) {
      //   setloader(false);
      //   setdataLength(updatedCount);
      // }
      // if (!dataLength) return null;
      return (
        <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
          awaitRefetchQueries={true}
        >
          {createTrainee => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
              awaitRefetchQueries={true}
            >
              {updateTrainee => (
                <Mutation
                  mutation={DELETE_TRAINEE}
                  refetchQueries={[{ query: GET_TRAINEE, variables }]}
                  awaitRefetchQueries={true}
                >
                  {deleteTrainee => (
                    <MyContext.Consumer>
                      {({ openSnackBar }) =>
                        !loader && (
                          <div className={classes.root}>
          <div className={classes.dialog}>
            <Button className={classes.traineeButton} variant="outlined" color="primary" onClick={(this.handleClickOpen)}>
              ADD TRAINEELIST
            </Button>
            <AddDialog
              onClose={this.handleClose}
              open={Open}
              onSubmit={data=>
              this.createData(
                data,
                openSnackBar,
                createTrainee
              )}
            />
          </div>
          <EditDialog
            onClose={this.handleEditButton}
            open={EditOpen}
            handleEdit={this.handleEdit}
            data={editData}
            onSubmit={data=>this.editData(
              data,
              openSnackBar,
              updateTrainee
            )}

          />
          <RemoveDialog
            data={deleteData}
            onClose={this.handleDeleteButton}
            open={DeleteOpen}
            database={this.traineedata}
            onSubmit={data=>this.deleteData(
              data,
              openSnackBar,
              deleteTrainee
            )}
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
        </div>
      )
    }
    </MyContext.Consumer>
                  )}
                  </Mutation>
              )}
              </Mutation>
          )}
          </Mutation>
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
  options: { variables: { skip: 0, limit: 5}}
}))(TraineeList);
