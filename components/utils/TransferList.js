import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    backgroundColor: "#161d31",
    color: "#b4b7bd",
    padding: theme.spacing(1, 2),
  },
  list: {
    border: 2,
    borderColor: "#b4b7bd",
    width: 200,
    height: 230,
    backgroundColor: "#283046",
    overflow: "auto",
  },
  button: {
    color: "#b4b7bd",
    borderColor: "#b4b7bd",
    margin: theme.spacing(0.5, 0),
  },
  listItem: {
    color: "#b4b7bd",
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({
  appointmentId,
  setRegisteredRegistrants,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const [registrantsKeyValue, setRegistrantsKeyValue] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const allRegistrants = await fetch(`/api/registrants`, {
          method: "GET",
        });
        const allRegistrantsData = await allRegistrants.json();
        if (allRegistrantsData.success) {
          let allRegistrantsUsername = [];
          let allRegistrantsKeyList = {};
          allRegistrantsData.data.forEach((data) => {
            allRegistrantsUsername.push(data.username);
            allRegistrantsKeyList[data.username] = data._id;
          });
          setLeft(allRegistrantsUsername);
          setRegistrantsKeyValue(allRegistrantsKeyList);
        } else {
        }
        
        const registeredRegistrants = await fetch(
          `/api/registrants?appointmentId=${appointmentId}`,
          { method: "GET" }
        );
        
        const registeredRegistrantsData = await registeredRegistrants.json();
        if (registeredRegistrantsData.success) {
          let registrantsUsername = [];
          registeredRegistrantsData.data.forEach((data) => {
            registrantsUsername.push(data.userProfile.username);
          });
          setRight(registrantsUsername);
        } else {
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    let registrantsProfileId = [];
    right.forEach((el)=> {
      registrantsProfileId.push({profileId: registrantsKeyValue[el]})
    })
    setRegisteredRegistrants(registrantsProfileId);

  }, [right])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              className={classes.listItem}
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList("All", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Registered", right)}</Grid>
    </Grid>
  );
}
