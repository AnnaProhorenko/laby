let selectedRectangle = null;
let posX = 0;
let posY = 0;

document.querySelectorAll('.target').forEach((rectangle) =>
{
rectangle.addEventListener('touchstart', (event) =>
{
selectedRectangle = event.target;
posX = selectedRectangle.style.left;
posY = selectedRectangle.style.top;

document.addEventListener('touchmove', touchToMove);
document.addEventListener('touchend', stopTheMovement);
document.addEventListener('touchstart', checkForSecondTouch);
});
rectangle.addEventListener('touchend', checkForDoubleTap);
});


function touchToMove(event)
{
selectedRectangle.removeEventListener('touchend', checkForDoubleTap);
selectedRectangle.style.left = event.touches[0].pageX - selectedRectangle.offsetWidth / 2 + 'px';
selectedRectangle.style.top = event.touches[0].pageY - selectedRectangle.offsetHeight / 2 + 'px';
selectedRectangle.style.backgroundColor = 'purple';
}


function stopTheMovement(event)
{
document.removeEventListener('touchmove', touchToMove);
posX = selectedRectangle.style.left;
posY = selectedRectangle.style.top;
selectedRectangle.style.backgroundColor = 'red';
document.removeEventListener('touchend', stopTheMovement);
document.removeEventListener('touchstart', checkForSecondTouch);
selectedRectangle.addEventListener('touchend', checkForDoubleTap);
}


let firstTapTime = 0;
let doubleTapMaximumDifference = 333;

function checkForDoubleTap(event) {
let currentTapTime = new Date().getTime();
if (firstTapTime == 0 || currentTapTime - firstTapTime > doubleTapMaximumDifference) {
firstTapTime = currentTapTime;
return;
}
selectedRectangle = event.target;
selectedRectangle.style.background = 'purple';
posX = selectedRectangle.style.left;
posY = selectedRectangle.style.top;
selectedRectangle.removeEventListener('touchend', checkForDoubleTap);
document.addEventListener('touchstart', cancelFollowing);
}



function cancelFollowing(event)
{
document.removeEventListener('touchstart', cancelFollowing);
let tapStartTime = new Date().getTime();
let tapStartX = event.changedTouches[0].pageX;
let tapStartY = event.changedTouches[0].pageY;
document.addEventListener('touchmove', touchToMove);
document.addEventListener('touchend', cancelTap);

function cancelTap(evt)
{
document.removeEventListener('touchend', cancelTap);

if(new Date().getTime() - tapStartTime <= tapCancelationTime && evt.changedTouches[0].pageX == tapStartX
&& evt.changedTouches[0].pageY == tapStartY)
{
selectedRectangle.style.backgroundColor = 'red';
document.removeEventListener('touchmove', touchToMove);
selectedRectangle.addEventListener('touchend', checkForDoubleTap);
}
else
{
selectedRectangle.style.left = evt.changedTouches[0].pageX - selectedRectangle.offsetWidth / 2 + 'px';
selectedRectangle.style.top = evt.changedTouches[0].pageY - selectedRectangle.offsetHeight / 2 + 'px';

document.addEventListener('touchstart', cancelFollowing);
}
}
}




function checkForSecondTouch(event)
{
if(event.touches.length === 2)
{
selectedRectangle.style.left = posX;
selectedRectangle.style.top = posY;

document.removeEventListener('touchmove', touchToMove);
document.removeEventListener('touchend', stopTheMovement);
selectedRectangle.style.backgroundColor = 'red';
selectedRectangle.addEventListener('touchend', checkForDoubleTap);
document.removeEventListener('touchstart', checkForSecondTouch);
}
}