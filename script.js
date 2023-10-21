class Machine {
  constructor () {
    this.powerOn = false;
  };

  turnOn () {
    this.powerOn = true;
    console.log('This machine is power on');
  };

  turnOff () {
    this.powerOn = false;
    console.log('This machine is power off');
  };
}


class HomeAppliance extends Machine {
  constructor () {
    super();
    this.plugedIn = false;
  };

  plugIn () {
    this.plugedIn = true;
    console.log('Home appliance is plugged in');
  };

  plugOff () {
    this.plugedIn = false;
    console.log('Home appliance is plugged off');
  };
}

class WashingMachine extends HomeAppliance {
  run () {
    if(!this.powerOn || !this.plugedIn) {
      console.log('Cannot run machine. Make sure it\'s powered on and plugged in. ');
    } else {
      console.log('Washing machine is running.');
    }
  };
}

const bosch = new WashingMachine();
bosch.plugIn();
bosch.turnOn();
bosch.run();


console.log('*'.repeat(20));

class LightSource extends HomeAppliance {
  constructor () {
    super();
    this.lightLevel = 0;
  };

  setLevel (level) {
    if (!this.plugedIn) {
      console.log('Please check connection!')
    }

    if (level > 1 && level < 100) {
      this.lightLevel = level;
      console.log(`Light level set to ${level}`);
    } else if (level < 1 || level > 100) {
      console.log(`Light level set to ${level}. Please set valid level between 1 and 100`);
    }

  }

  turnOn() {

    if (!this.lightLevel) {
      console.log(`Light level is not set / or value isn't correct.`);
    } else {
      super.turnOn();
      console.log(`Light is turned on at level is ${this.lightLevel}`);
    }
  }

}

const lightBulb = new LightSource();
lightBulb.plugIn();
lightBulb.setLevel(60);
lightBulb.turnOn();

console.log('*'.repeat(20));


class AutoVehicle extends Machine {
  constructor () {
    super();
    this.x = 0;
    this.y = 0;
  };

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    console.log(`Vehicle position set X: ${x}, Y: ${y}`);
  };

}

class Car extends AutoVehicle {
  constructor () {
    super();
    this.speed = 10;
    this.intervalId = null;
  };

  setSpeed(speed) {
    this.speed = speed;
    console.log(`Car speed set ${speed} km/h`);
  }

  run (destinationX, destinationY) {

    if(!this.powerOn) {
     console.log("Cannot run the car. Make sure the powered is on!");
     return;
    }

    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {

      const coordinateX = Math.min(this.speed, Math.abs(destinationX - this.x));
      const coordinateY = Math.min(this.speed, Math.abs(destinationY - this.y));

      if (this.x < destinationX) {
        this.x += coordinateX;
      } else if (this.x > destinationX) {
        this.x -= coordinateX;
      }

      if (this.y < destinationY) {
        this.y += coordinateY;
      } else if (this.y > destinationY) {
        this.y -= coordinateY;
      }

      console.log(`Car is at X: ${this.x}, Y: ${this.y}`);

      if (this.x === destinationX && this.y === destinationY) {
        clearInterval(this.intervalId);
        console.log(`Car has reached its destination.`);
      }

    }, 1000);
  }
}

const honda = new Car();
honda.setPosition(30, 40);
honda.turnOn();
honda.setSpeed(60);
honda.run(180, 240);
