import { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { Box } from '@chakra-ui/layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import MainList from './components/list/Main';
import SearchList from './components/list/Search';
import PostItem from './components/item/Item';
import SourceList from './components/list/Source';
import CommentEdit from './components/comment/Edit';
import CommentDelete from './components/comment/Delete';
import ContactPage from './components/contact';

const App = () => {
  useEffect(() => {
    CapApp.addListener('backButton', () => {
      if (window.location.href === 'http://localhost/') {
        CapApp.exitApp();
      } else {
        window.history.back();
      }
    });
    return () => {
      CapApp.removeAllListeners();
    };
  }, []);
  return (
    <Router>
      <Header />
      <Box bg="white" w="full" h="100%" paddingTop="80px" paddingX="8">
        <Switch>
          <Route exact path="/" component={MainList} />
          <Route exact path="/id/:id" component={PostItem} />
          <Route exact path="/source/:id" component={SourceList} />
          <Route exact path="/search/:keyword" component={SearchList} />
          <Route exact path="/comments/edit/:id" component={CommentEdit} />
          <Route exact path="/comments/delete/:id" component={CommentDelete} />
          <Route exact path="/contact" component={ContactPage} />
        </Switch>
      </Box>
    </Router>
  );
};

export default App;
