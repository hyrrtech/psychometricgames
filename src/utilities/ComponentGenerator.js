import React from 'react';

class ComponentGenerator {
  constructor() {
    this.objects = {};
    this.generateNew = function (Component) {
      const newId = Math.random();
      this.objects[newId] = React.cloneElement(Component, {
        key: newId,
        id: newId,
      });
      return newId;
    };

    this.get = function (uuid) {
      return this.objects[uuid];
    };

    this.destroy = function (uuid) {
      // console.log('Deleting: ', uuid);
      delete this.objects[uuid];
    };
  }
}

export default ComponentGenerator;
