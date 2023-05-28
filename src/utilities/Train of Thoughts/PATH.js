const path = {
  switch: {
    //switch 1
    x: 15 + 275 - 50 / 2,
    y: 50 + 575 - 26 / 2,
    id: 1,
    horizontal_left: {
      //switch 1 path 0
      path: [
        //down
        {x: 15 + 275 - 26 / 2, y: 50 + 575 + 26 / 2},
        {x: 15 + 275 - 26 / 2, y: 50 + 625 + 26 / 2},
      ],
      switch: {
        //switch 3
        x: 15 + 275 - 50 / 2,
        y: 50 + 625 + 26 / 2 + 50 / 2,
        id: 3,
        vertical_left_down: {
          //switch 3 path 0
          path: [
            //left
            {x: 15 + 250 - 26 / 2, y: 50 + 675},
            {x: 15 + 225, y: 50 + 675},
          ],
          destination: {
            color: 'pink',
            x: 15 + 200 - 50 / 2,
            y: 50 + 675 - 26 / 2,
          },
        },
        vertical: {
          //switch 3 path 1
          path: [
            //down
            {x: 15 + 275 - 26 / 2, y: 50 + 675 + 26 / 2},
            {x: 15 + 275 - 26 / 2, y: 50 + 725 + 26 / 2},
          ],
          destination: {
            x: 15 + 275 - 50 / 2,
            y: 50 + 725 + 26 / 2 + 50 / 2,
            color: 'green',
          },
        },
      },
    },
    horizontal: {
      //switch 1 path 1
      path: [
        //left
        {x: 15 + 250, y: 50 + 575},
        {x: 15 + 225, y: 50 + 575},
      ],
      //switch 2
      switch: {
        x: 15 + 200 - 50 / 2,
        y: 50 + 575 - 26 / 2,
        id: 2,

        horizontal: {
          //switch 2 path 0
          path: [
            //left
            {x: 15 + 175, y: 50 + 575},
            {x: 15 + 150, y: 50 + 575},
          ],
          //switch 4
          switch: {
            x: 15 + 125 - 50 / 2,
            y: 50 + 575 - 26 / 2,
            id: 4,

            horizontal: {
              //switch 4 path 0
              path: [
                //left
                {x: 15 + 100, y: 50 + 575},
                {x: 15 + 75, y: 50 + 575},
              ],
              destination: {
                x: 15 + 50 - 50 / 2,
                y: 50 + 575 - 26 / 2,
                color: 'aqua',
              },
            },
            horizontal_left: {
              //switch 4 path 1
              path: [
                //down
                {x: 15 + 125 - 26 / 2, y: 50 + 575 + 26 / 2},
                {x: 15 + 125 - 26 / 2, y: 50 + 625 + 26 / 2},
              ],
              //switch 5
              switch: {
                x: 15 + 125 - 50 / 2,
                y: 50 + 625 + 26 / 2 + 50 / 2,
                id: 5,

                vertical_left_down: {
                  //switch 5 path 0
                  path: [
                    //left
                    {x: 15 + 100, y: 50 + 675},
                    {x: 15 + 75, y: 50 + 675},
                  ],
                  destination: {
                    x: 15 + 50 - 50 / 2,
                    y: 50 + 675 - 26 / 2,
                    color: 'aquamarine',
                  },
                },
                vertical: {
                  //switch 5 path 1
                  path: [
                    //down
                    {x: 15 + 125 - 26 / 2, y: 50 + 675 + 26 / 2},
                    {x: 15 + 125 - 26 / 2, y: 50 + 725 + 26 / 2},
                  ],
                  destination: {
                    x: 15 + 125 - 50 / 2,
                    y: 50 + 725 + 26 / 2 + 50 / 2,
                    color: 'beige',
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
            {x: 15 + 200 - 26 / 2, y: 50 + 575 - 26 / 2},
            {x: 15 + 200 - 26 / 2, y: 50 + 525 - 26 / 2},
          ],
          //switch 6
          switch: {
            x: 15 + 200 - 50 / 2,
            y: 50 + 500 - 50 / 2 - 26 / 2,
            id: 6,

            vertical: {
              //switch 6 path 0
              path: [
                //up
                {x: 15 + 200 - 26 / 2, y: 50 + 475 - 26 / 2},
                {x: 15 + 200 - 26 / 2, y: 50 + 425 - 26 / 2},
              ],
              //switch 10
              switch: {
                x: 15 + 200 - 50 / 2,
                y: 50 + 400 - 50 / 2 - 26 / 2,
                id: 10,

                vertical_left: {
                  //switch 10 path 0
                  path: [
                    //left
                    {x: 15 + 200 - 50 / 2, y: 50 + 400 - 50 / 2},
                    {x: 15 + 150, y: 50 + 400 - 50 / 2},
                  ],
                  //switch 11
                  switch: {
                    x: 15 + 125 - 50 / 2,
                    y: 50 + 400 - 50 / 2 - 26 / 2,

                    id: 11,
                    horizontal_left: {
                      //switch 11 path 0
                      path: [
                        //down
                        {
                          x: 15 + 125 - 26 / 2,
                          y: 50 + 400 - 26 / 2,
                        },
                        {x: 15 + 125 - 26 / 2, y: 50 + 450 - 26 / 2},
                      ],
                      destination: {
                        x: 15 + 125 - 50 / 2,
                        y: 50 + 475 - 26 / 2,
                        color: 'chartreuse',
                      },
                    },
                    horizontal: {
                      //switch 11 path 1
                      path: [
                        //left
                        {
                          x: 15 + 125 - 50 / 2,
                          y: 50 + 400 - 50 / 2,
                        },
                        {x: 15 + 75, y: 50 + 400 - 50 / 2},
                      ],
                      destination: {
                        x: 15 + 50 - 50 / 2,
                        y: 50 + 400 - 50 / 2 - 26 / 2,
                        color: 'coral',
                      },
                    },
                  },
                },
                vertical: {
                  //switch 10 path 1
                  path: [
                    //up
                    {x: 15 + 200 - 26 / 2, y: 50 + 375 - 26 / 2},
                    {x: 15 + 200 - 26 / 2, y: 50 + 325 - 26 / 2},
                  ],
                  //switch 12
                  switch: {
                    x: 15 + 200 - 50 / 2,
                    y: 50 + 300 - 50 / 2 - 26 / 2,
                    id: 12,

                    vertical: {
                      //switch 12 path 0
                      path: [
                        //up
                        {x: 15 + 200 - 26 / 2, y: 50 + 275 - 26 / 2},
                        {x: 15 + 200 - 26 / 2, y: 50 + 225 - 26 / 2},
                      ],
                      destination: {
                        x: 15 + 200 - 50 / 2,
                        y: 50 + 200 - 50 / 2 - 26 / 2,
                        color: 'orange',
                      },
                    },
                    vertical_left: {
                      //switch 12 path 1
                      path: [
                        //left
                        {
                          x: 15 + 200 - 50 / 2,
                          y: 50 + 300 - 50 / 2,
                        },
                        {x: 15 + 150, y: 50 + 300 - 50 / 2},
                      ],
                      //switch 13
                      switch: {
                        x: 15 + 125 - 50 / 2,
                        y: 50 + 300 - 50 / 2 - 26 / 2,
                        id: 13,

                        horizontal_right: {
                          //switch 13 path 0
                          path: [
                            //up
                            {
                              x: 15 + 125 - 26 / 2,
                              y: 50 + 275 - 26 / 2,
                            },
                            {
                              x: 15 + 125 - 26 / 2,
                              y: 50 + 225 - 26 / 2,
                            },
                          ],
                          destination: {
                            x: 15 + 125 - 50 / 2,
                            y: 50 + 200 - 50 / 2 - 26 / 2,
                            color: 'gray',
                          },
                        },
                        horizontal: {
                          //switch 13 path 1
                          path: [
                            //left
                            {
                              x: 15 + 125 - 50 / 2,
                              y: 50 + 300 - 50 / 2,
                            },
                            {x: 15 + 75, y: 50 + 300 - 50 / 2},
                          ],
                          destination: {
                            x: 15 + 50 - 50 / 2,
                            y: 50 + 300 - 50 / 2 - 26 / 2,
                            color: 'crimson',
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
                {x: 15 + 200, y: 50 + 500 - 50 / 2},
                {x: 15 + 225, y: 50 + 500 - 50 / 2},
              ],
              //switch 7
              switch: {
                x: 15 + 250,
                y: 50 + 500 - 50 / 2 - 26 / 2,
                id: 7,

                horizontal: {
                  //switch 7 path 0
                  path: [
                    //right
                    {x: 15 + 275, y: 50 + 500 - 50 / 2},
                    {x: 15 + 325, y: 50 + 500 - 50 / 2},
                  ],
                  destination: {
                    x: 15 + 350,
                    y: 50 + 500 - 50 / 2 - 26 / 2,
                    color: 'red',
                  },
                },
                horizontal_left_up: {
                  //switch 7 path 1
                  path: [
                    //up
                    {
                      x: 15 + 275 - 26 / 2,
                      y: 50 + 500 - 50 / 2 - 26 / 2,
                    },
                    {x: 15 + 275 - 26 / 2, y: 50 + 425 - 26 / 2},
                  ],

                  //switch 8
                  switch: {
                    x: 15 + 275 - 50 / 2,
                    y: 50 + 400 - 50 / 2 - 26 / 2,
                    id: 8,

                    vertical_right: {
                      //switch 8 path 0
                      path: [
                        //right
                        {x: 15 + 275, y: 50 + 400 - 50 / 2},
                        {x: 15 + 325, y: 50 + 400 - 50 / 2},
                      ],
                      destination: {
                        //station
                        x: 15 + 350,
                        y: 50 + 400 - 50 / 2 - 26 / 2,
                        color: 'blue',
                      },
                    },
                    vertical: {
                      //switch 8 path 1
                      path: [
                        //up
                        {
                          x: 15 + 275 - 26 / 2,
                          y: 50 + 400 - 50 / 2 - 26 / 2,
                        },
                        {x: 15 + 275 - 26 / 2, y: 50 + 325 - 26 / 2},
                      ],
                      //switch 9
                      switch: {
                        x: 15 + 275 - 50 / 2,
                        y: 50 + 300 - 50 / 2 - 26 / 2,
                        id: 9,

                        vertical_right: {
                          //switch 9 path 0
                          path: [
                            //right
                            {x: 15 + 275, y: 50 + 300 - 50 / 2},
                            {x: 15 + 325, y: 50 + 300 - 50 / 2},
                          ],
                          destination: {
                            x: 15 + 350,
                            y: 50 + 300 - 50 / 2 - 26 / 2,
                            color: 'yellow',
                          },
                        },
                        vertical: {
                          //switch 9 path 1
                          path: [
                            //up
                            {
                              x: 15 + 275 - 26 / 2,
                              y: 50 + 300 - 50 / 2 - 26 / 2,
                            },
                            {
                              x: 15 + 275 - 26 / 2,
                              y: 50 + 225 - 26 / 2,
                            },
                          ],
                          destination: {
                            x: 15 + 275 - 50 / 2,
                            y: 50 + 200 - 50 / 2 - 26 / 2,
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

export default path;
