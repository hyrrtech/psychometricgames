const path = (switchSize, pathSize) => {
  return {
    switch: {
      //switch 1
      x: 275 - switchSize / 2,
      y: 50 + 575 - pathSize / 2,
      id: 1,
      horizontal_left: {
        //switch 1 path 0
        path: [
          //down
          {x: 275 - pathSize / 2, y: 50 + 575 + pathSize / 2},
          {x: 275 - pathSize / 2, y: 50 + 625 + pathSize / 2},
        ],
        switch: {
          //switch 3
          x: 275 - switchSize / 2,
          y: 50 + 625 + pathSize / 2 + switchSize / 2,
          id: 3,
          vertical_left_down: {
            //switch 3 path 0
            path: [
              //left
              {x: 250 - pathSize / 2, y: 50 + 675},
              {x: 225, y: 50 + 675},
            ],
            destination: {
              color: 'pink',
              x: 200 - switchSize / 2,
              y: 50 + 675 - pathSize / 2,
            },
          },
          vertical: {
            //switch 3 path 1
            path: [
              //down
              {x: 275 - pathSize / 2, y: 50 + 675 + pathSize / 2},
              {x: 275 - pathSize / 2, y: 50 + 725 + pathSize / 2},
            ],
            destination: {
              x: 275 - switchSize / 2,
              y: 50 + 725 + pathSize / 2 + switchSize / 2,
              color: 'green',
            },
          },
        },
      },
      horizontal: {
        //switch 1 path 1
        path: [
          //left
          {x: 250, y: 50 + 575},
          {x: 225, y: 50 + 575},
        ],
        //switch 2
        switch: {
          x: 200 - switchSize / 2,
          y: 50 + 575 - pathSize / 2,
          id: 2,

          horizontal: {
            //switch 2 path 0
            path: [
              //left
              {x: 175, y: 50 + 575},
              {x: 150, y: 50 + 575},
            ],
            //switch 4
            switch: {
              x: 125 - switchSize / 2,
              y: 50 + 575 - pathSize / 2,
              id: 4,

              horizontal: {
                //switch 4 path 0
                path: [
                  //left
                  {x: 100, y: 50 + 575},
                  {x: 75, y: 50 + 575},
                ],
                destination: {
                  x: 50 - switchSize / 2,
                  y: 50 + 575 - pathSize / 2,
                  color: '#32b6e7',
                },
              },
              horizontal_left: {
                //switch 4 path 1
                path: [
                  //down
                  {x: 125 - pathSize / 2, y: 50 + 575 + pathSize / 2},
                  {x: 125 - pathSize / 2, y: 50 + 625 + pathSize / 2},
                ],
                //switch 5
                switch: {
                  x: 125 - switchSize / 2,
                  y: 50 + 625 + pathSize / 2 + switchSize / 2,
                  id: 5,

                  vertical_left_down: {
                    //switch 5 path 0
                    path: [
                      //left
                      {x: 100, y: 50 + 675},
                      {x: 75, y: 50 + 675},
                    ],
                    destination: {
                      x: 50 - switchSize / 2,
                      y: 50 + 675 - pathSize / 2,
                      color: '#ecd821',
                    },
                  },
                  vertical: {
                    //switch 5 path 1
                    path: [
                      //down
                      {x: 125 - pathSize / 2, y: 50 + 675 + pathSize / 2},
                      {x: 125 - pathSize / 2, y: 50 + 725 + pathSize / 2},
                    ],
                    destination: {
                      x: 125 - switchSize / 2,
                      y: 50 + 725 + pathSize / 2 + switchSize / 2,
                      color: '#434343',
                    },
                  },
                },
              },
            },
          },

          horizontal_right: {
            //switch 2 path 1
            path: [
              //up
              {x: 200 - pathSize / 2, y: 50 + 575 - pathSize / 2},
              {x: 200 - pathSize / 2, y: 50 + 525 - pathSize / 2},
            ],
            //switch 6
            switch: {
              x: 200 - switchSize / 2,
              y: 50 + 500 - switchSize / 2 - pathSize / 2,
              id: 6,

              vertical: {
                //switch 6 path 0
                path: [
                  //up
                  {x: 200 - pathSize / 2, y: 50 + 475 - pathSize / 2},
                  {x: 200 - pathSize / 2, y: 50 + 425 - pathSize / 2},
                ],
                //switch 10
                switch: {
                  x: 200 - switchSize / 2,
                  y: 50 + 400 - switchSize / 2 - pathSize / 2,
                  id: 10,

                  vertical_left: {
                    //switch 10 path 0
                    path: [
                      //left
                      {x: 200 - switchSize / 2, y: 50 + 400 - switchSize / 2},
                      {x: 150, y: 50 + 400 - switchSize / 2},
                    ],
                    //switch 11
                    switch: {
                      x: 125 - switchSize / 2,
                      y: 50 + 400 - switchSize / 2 - pathSize / 2,

                      id: 11,
                      horizontal_left: {
                        //switch 11 path 0
                        path: [
                          //down
                          {
                            x: 125 - pathSize / 2,
                            y: 50 + 400 - pathSize / 2,
                          },
                          {x: 125 - pathSize / 2, y: 50 + 450 - pathSize / 2},
                        ],
                        destination: {
                          x: 125 - switchSize / 2,
                          y: 50 + 475 - pathSize / 2,
                          color: 'rgba(0,0,0,0.5)',
                        },
                      },
                      horizontal: {
                        //switch 11 path 1
                        path: [
                          //left
                          {
                            x: 125 - switchSize / 2,
                            y: 50 + 400 - switchSize / 2,
                          },
                          {x: 75, y: 50 + 400 - switchSize / 2},
                        ],
                        destination: {
                          x: 50 - switchSize / 2,
                          y: 50 + 400 - switchSize / 2 - pathSize / 2,
                          color: '#1c1c1c',
                        },
                      },
                    },
                  },
                  vertical: {
                    //switch 10 path 1
                    path: [
                      //up
                      {x: 200 - pathSize / 2, y: 50 + 375 - pathSize / 2},
                      {x: 200 - pathSize / 2, y: 50 + 325 - pathSize / 2},
                    ],
                    //switch 12
                    switch: {
                      x: 200 - switchSize / 2,
                      y: 50 + 300 - switchSize / 2 - pathSize / 2,
                      id: 12,

                      vertical: {
                        //switch 12 path 0
                        path: [
                          //up
                          {x: 200 - pathSize / 2, y: 50 + 275 - pathSize / 2},
                          {x: 200 - pathSize / 2, y: 50 + 225 - pathSize / 2},
                        ],
                        destination: {
                          x: 200 - switchSize / 2,
                          y: 50 + 200 - switchSize / 2 - pathSize / 2,
                          color: 'orange',
                        },
                      },
                      vertical_left: {
                        //switch 12 path 1
                        path: [
                          //left
                          {
                            x: 200 - switchSize / 2,
                            y: 50 + 300 - switchSize / 2,
                          },
                          {x: 150, y: 50 + 300 - switchSize / 2},
                        ],
                        //switch 13
                        switch: {
                          x: 125 - switchSize / 2,
                          y: 50 + 300 - switchSize / 2 - pathSize / 2,
                          id: 13,

                          horizontal_right: {
                            //switch 13 path 0
                            path: [
                              //up
                              {
                                x: 125 - pathSize / 2,
                                y: 50 + 275 - pathSize / 2,
                              },
                              {
                                x: 125 - pathSize / 2,
                                y: 50 + 225 - pathSize / 2,
                              },
                            ],
                            destination: {
                              x: 125 - switchSize / 2,
                              y: 50 + 200 - switchSize / 2 - pathSize / 2,
                              color: 'gray',
                            },
                          },
                          horizontal: {
                            //switch 13 path 1
                            path: [
                              //left
                              {
                                x: 125 - switchSize / 2,
                                y: 50 + 300 - switchSize / 2,
                              },
                              {x: 75, y: 50 + 300 - switchSize / 2},
                            ],
                            destination: {
                              x: 50 - switchSize / 2,
                              y: 50 + 300 - switchSize / 2 - pathSize / 2,
                              color: '#e9e9e9',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              vertical_right: {
                //switch 6 path 1
                path: [
                  //right
                  {x: 200, y: 50 + 500 - switchSize / 2},
                  {x: 225, y: 50 + 500 - switchSize / 2},
                ],
                //switch 7
                switch: {
                  x: 250,
                  y: 50 + 500 - switchSize / 2 - pathSize / 2,
                  id: 7,

                  horizontal: {
                    //switch 7 path 0
                    path: [
                      //right
                      {x: 275, y: 50 + 500 - switchSize / 2},
                      {x: 325, y: 50 + 500 - switchSize / 2},
                    ],
                    destination: {
                      x: 350,
                      y: 50 + 500 - switchSize / 2 - pathSize / 2,
                      color: 'red',
                    },
                  },
                  horizontal_left_up: {
                    //switch 7 path 1
                    path: [
                      //up
                      {
                        x: 275 - pathSize / 2,
                        y: 50 + 500 - switchSize / 2 - pathSize / 2,
                      },
                      {x: 275 - pathSize / 2, y: 50 + 425 - pathSize / 2},
                    ],

                    //switch 8
                    switch: {
                      x: 275 - switchSize / 2,
                      y: 50 + 400 - switchSize / 2 - pathSize / 2,
                      id: 8,

                      vertical_right: {
                        //switch 8 path 0
                        path: [
                          //right
                          {x: 275, y: 50 + 400 - switchSize / 2},
                          {x: 325, y: 50 + 400 - switchSize / 2},
                        ],
                        destination: {
                          //station
                          x: 350,
                          y: 50 + 400 - switchSize / 2 - pathSize / 2,
                          color: 'blue',
                        },
                      },
                      vertical: {
                        //switch 8 path 1
                        path: [
                          //up
                          {
                            x: 275 - pathSize / 2,
                            y: 50 + 400 - switchSize / 2 - pathSize / 2,
                          },
                          {x: 275 - pathSize / 2, y: 50 + 325 - pathSize / 2},
                        ],
                        //switch 9
                        switch: {
                          x: 275 - switchSize / 2,
                          y: 50 + 300 - switchSize / 2 - pathSize / 2,
                          id: 9,

                          vertical_right: {
                            //switch 9 path 0
                            path: [
                              //right
                              {x: 275, y: 50 + 300 - switchSize / 2},
                              {x: 325, y: 50 + 300 - switchSize / 2},
                            ],
                            destination: {
                              x: 350,
                              y: 50 + 300 - switchSize / 2 - pathSize / 2,
                              color: 'yellow',
                            },
                          },
                          vertical: {
                            //switch 9 path 1
                            path: [
                              //up
                              {
                                x: 275 - pathSize / 2,
                                y: 50 + 300 - switchSize / 2 - pathSize / 2,
                              },
                              {
                                x: 275 - pathSize / 2,
                                y: 50 + 225 - pathSize / 2,
                              },
                            ],
                            destination: {
                              x: 275 - switchSize / 2,
                              y: 50 + 200 - switchSize / 2 - pathSize / 2,
                              color: 'purple',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};
export default path;
