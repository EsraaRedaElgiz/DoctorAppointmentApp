import React from 'react';

const DoctorAppContainer = props => {
  const {isAuth} = props;
  return (
    <>
      <StatusBar backgroundColor={COLORS.blue} />
      <NavigationContainer>
        {isAuth ? <HomeTabs /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default DoctorAppContainer;
