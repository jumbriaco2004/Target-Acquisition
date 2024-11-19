var AimSystem = function () //Constructor
{
    this.rotationAngle = 0;
    this.rotationSpeed = 0.05
    this.rotatingDirection = null;
};

AimSystem.prototype =
{
    startRotation: function (direction) 
    {
        if (direction === 'clockwise') {
            this.rotatingDirection = 'clockwise';
        } else if (direction === 'counterclockwise') {
            this.rotatingDirection = 'counterclockwise';
        }

    },

    stopRotation: function () 
    {
        this.rotatingDirection = null;
        //console.log('Rotation stopped. Direction:', this.rotatingDirection);

    },

    updateRotation: function () 
    {
        //console.log('Updating rotation. Current direction:', this.rotatingDirection);

        if (this.rotatingDirection === 'clockwise') {
            this.rotationAngle += this.rotationSpeed;
        } else if (this.rotatingDirection === 'counterclockwise') {
            this.rotationAngle -= this.rotationSpeed;
        }
        this.rotationAngle = (this.rotationAngle + 2 * Math.PI) % (2 * Math.PI);
    },

    getRotationAngle: function () 
    {
        return this.rotationAngle;
    },

};