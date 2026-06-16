import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const Loading = () => <Progress />;
const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const onSignIn = () => {
    setSignedIn(true);
  };

  const onSignOut = () => {
    setSignedIn(false);
  };

  return (
    <BrowserRouter>
      <Header signedIn={signedIn} onSignOut={onSignOut} />

      <Suspense fallback={<Loading />}>
        <div>
          <Switch>
            <Route
              path="/auth"
              component={() => <AuthApp onSignIn={onSignIn} />}
            />
            <Route
              path="/"
              component={() => <MarketingApp signedIn={signedIn} />}
            />
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
