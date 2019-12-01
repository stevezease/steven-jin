// Project 1
//  main.cpp
//  Physics Simulation OpenGl
//
//  Created by Steven Jin on 9/8/15.
//
#include <mach-o/dyld.h>     // for Macs
#include <GLUT/glut.h>       // for Macs
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <unistd.h>
#include <time.h>
#include "kiss_fft.h"
#include "kiss_fftr.h"
#include "wave.h"
#include <SDL2_mixer/SDL_mixer.h>
#include <sys/time.h>
#include <string>

#ifndef M_PI
#define M_PI 3.14159265358979324
#endif
#define TRUE 1
#define FALSE 0
#define bars 16
#define N 2048
#define window_size 800

//Global variable used for colors
float aa = 1.0;
float ba = 1.0;
float ca = 1.0;
float aaa = .00000025;
float bbb = .0000005;
float ccc = .00000015;
int transitiona = -1;
int transitionb = -1;
int transitionc = -1;

//Vector Stuff
double t=0;
double dt=5e-2; // The change in time default 1e-5
int order=75; //Grid will be order * order number of stars
double x[10000]={0}; //x coordinates
double y[10000]={0}; //y coordinates
double vx[10000]={0}; //x velocity
double vy[10000]={0}; //y velocity
double vx1[10000];// temporary placeholders for unit seperation vectors
double vy1[10000];
double vx2[10000];// temporary placeholders for unit seperation vectors
double vy2[10000];
double GM=4*M_PI*M_PI; // Gravitational Constant
double power = 1; // How strong your clicks
static double mouseux;//r unit vector(mouse unit vector)
static double mouseuy;
static double xu[10000];//r' unit vector
static double yu[10000];
static double umag[10000];//magitude of the seperation vector
static double umag2[10000];
double viscousity = 1.0025; //Dampening/Air resistance
double mx1;
double my1;
static double dsquared = 1; //r

//Glut Stuff
int nextdraw=-1;
int walltime;
int last_walltime;
int steps=0;
int frames=0;
int check =0;

//Toggles
int gravity = 1;
int looper = -1;
int temps = 0;
int mousedown = 0; //boolean for whether mouse is down
int paused = -1;
int mousekick = -1;

static int bar = 1;
static int reverse = 1; // Toggles the direction of the force inward/outward
static int distance = 1; // Toggles whether force falls off by a factor of r^2
static int viscous = 1; //Toggles air resistance
static int blackhole = -1;//Toggles a cool black hole effect, works best with distance toggled on
static int color = 2; // Toggles on and off color

int screensizex =0;
int screensizey =0;



float kicks[bars];
FILE * pFile;
FILE *ptr;
//Used for reading in header
unsigned char buffer4[4];
unsigned char buffer2[2];
char* seconds_to_time(float seconds);
char *filename;
struct HEADER header;
//clock_t start;
struct timeval  start;
struct timeval  end;
double startm = 0;
//Counters
int sumcounter = 0;
int counter = 0;
int samples = 0;
int framecounter =1;
//Toggles
static double temp = 0;
double size = .2/order;
double betweendistance = size*10;
int counter2 = 0;
kiss_fft_scalar in[N];
int netdif = 0;

//Function Declarations
void circle(double x, double y, double r);
void disp(void);
void idle(void);
void keyb(unsigned char key, int m, int n);
void kickup(int p,float intensity);
void performFFT(void);
void mouse(int button, int state, int mx, int my);
void mousecor(int mx, int my);
void move(int i, double xin, double yin);
void readSamples(void);
char* seconds_to_time(float raw_seconds);


//function that kicks up the particles
void kickup(int p,float intensity){
    for (int i = 0; i<(order*order); i++){
        float mult = 0;
        if(bar ==-1)
            mult = 1.00;
        else
            mult =((rand()%10)/10.00);
        
    if((x[i]+1)>(p/((float)(bars/2)))&&(x[i]+1)<((p+1)/((float)(bars/2)))&&(y[i]==-1)){
       // if((x[i]+1)>(p/((float)(bars/2)))&&(x[i]+1)<((p+1)/((float)(bars/2)))&&(y[i]<-.99)){
        vy[i] = vy[i] +.09*intensity*mult;
        }
    }
}


void mouse(int button, int state, int mx, int my){
    mx1 = mx;
    my1 = my;
    if ((button == GLUT_LEFT_BUTTON) && (state == GLUT_DOWN))
        mousedown = 1;
    if (state == GLUT_UP)
        mousedown = 0;
}

void mousecor(int mx, int my){
    mx1 = mx;
    my1 = my;
}

void readSamples(void){
    int k = 0;
    while (k<N){
        int16_t a = 0, b=0;
        fread(&a, 2, 1, ptr);
        fread(&b, 2, 1, ptr);
        int16_t sum = (a+b)/2;
        
        //Rectangular Window
        //in[k] = sum;
        
        //Hann Window
        //in[k] = sum*0.5*(1-cos(2*M_PI*k/(N-1)));
        
        //Hamming Window
        //in[k] = sum*(.54-.46*cos(2*M_PI*k/(N-1)));
        
        //Blackman-Nuttall Window
        in[k] = sum*(0.3635819 - (.4891775*cos(2*M_PI*k/(N-1))) + (.1365995*cos(4*M_PI*k/(N-1)))-(.0106511*cos(6*M_PI*k/(N-1))));
        k++;
        samples++;
        samples++;
    }
}

void performFFT(void){
    kiss_fft_cpx out[N / 2 + 1];
    kiss_fftr_cfg cfg;
    
    //if theres enough memory
    if ((cfg = kiss_fftr_alloc(N, 0/*is_inverse_fft*/, NULL, NULL)) != NULL){
        int kickcounter = 0;
        size_t i;
        float sums = 0;
        kiss_fftr(cfg, in, out);
        free(cfg);
        
        for (i = 0; i <( N); i++){
            if(i<(N/2 +1)){
                sumcounter++;
                sums += (((pow(out[i].r,2)) + (pow(out[i].i,2))));
                if(i>=floor(pow(2,(kickcounter+1)*(((log(N)/log(2))-1)/bars)))){
                    sums = sums/sumcounter;
                    kicks[kickcounter] = log(sums)*.045;
                    kickcounter++;
                    if(kickcounter == bars){
                        kickcounter =0;
                    }
                    sums = 0;
                    sumcounter = 0;
                }
            }
        }
        
    }
    //Kick up the bars
    for(int i = 0; i<bars; i++)
    {
        kickup(i,kicks[i]);
    }
    
    if(mousedown){
        
    }
    
}

// GLUT calls this function in a continuous loop
void idle(void){
    if(paused==-1){
        gettimeofday(&end, NULL);
        double endm = (end.tv_sec) * 1000 + (end.tv_usec) / 1000 ;
        
        if (((endm-startm)> (N*1000.00/44100)*framecounter)){
            framecounter++;
            readSamples();
            performFFT();
        }
        
        
    }

    
    screensizex = glutGet(GLUT_WINDOW_WIDTH);
    screensizey = glutGet(GLUT_WINDOW_HEIGHT);
    
    if (gravity == 1){
        for (int i = 0; i<(order*order); i++){
            vy[i] -= .00010;
        }
    }
    counter++;
    if((mousedown)&&(counter%2 == 0)){
        dsquared = 1;
        
        //find the unit vector of the mouse
        mouseux = (mx1-screensizex/2)/(screensizex/2);
        mouseuy = -1*(my1-screensizey/2)/(screensizey/2);
        
        for (int i = 0; i<(order*order); i++){
            //Compute the magnitude of the seperation vector( taken from text book)
            umag[i] = sqrt(pow((mouseux-x[i]),2)+pow((mouseuy-y[i]),2));
            
            //Compute the Unit Seperation Vector
            vx1[i] = (mouseux-x[i])/umag[i]; //x direction
            vy1[i] = (mouseuy-y[i])/umag[i]; //y direction
       
            //If distance is toggled on then compute r^2
            if (distance ==1){
                dsquared = pow(umag[i],2);
                dsquared = 10*dsquared;
            }
            else{
                dsquared = 1;
            }
            
            //If depending on whether reverse is toggled on add or subtrace the unit vector
            //'power' might be a future addition where user is able to increase/decrease the power of the force
            if(umag[i]<.001){
                power = 0;
            }
            else{
                power = .3;
            }
            
            if (reverse ==1){
                vx[i] += power*vx1[i]/(1000*dsquared);
                vy[i] += power*vy1[i]/(1000*dsquared);
            }
            else{
                vx[i] -= power*vx1[i]/(1000*dsquared);
                vy[i] -= power*vy1[i]/(1000*dsquared);
            }
            
            if((umag[i]<.05)&&(distance==-1)&&(mousekick == 1)){
                gravity = -1;
                
                float mult = 0;
                if(bar ==-1)
                    mult = 1.00;
                else
                    mult =((rand()%10)/10.00)*2;
                
                int barx = (int)(((atan2((mouseuy-y[i]),(mouseux-x[i]))* 180 / 3.14159)+180)/(360.00/bars));
                if (reverse ==1){
                vx[i] += mult*.04*kicks[barx]*vx[i];
                vy[i] += mult*.04*kicks[barx]*vy[i];
                }
            }
        }
        
    }else if((!mousedown)&&(mousekick==1)){
        gravity = 1;
    }
    
    //if black hole is toggled then rotate the vector 90 degrees
    if (blackhole == 1){
        for (int i = 0; i<(order*order); i++){
            temp = vx[i];
            vx[i] = -vy[i];
            vy[i] = temp;
        }
    }
    
    for (int i = 0; i<(order*order); i++){
        if (viscous ==1)
        {
            vx[i] = vx[i]/viscousity;
            vy[i] = vy[i]/viscousity;
        }
    }
    
    steps++;   // keep track of how many steps we've done, for statistics (press F)
    static double xmid,ymid,vxmid,vymid,r; // declare these as static to avoid overhead from memory reallocation each time idle() is called
    
    //prevents the balls from flying out to infinity
    if (looper == 1)
    {
        
        for (int i = 0; i<(order*order); i++){
            if(y[i]<-1 && vy[i] <0) y[i] = 1;
            if(x[i]<-1 && vx[i] <0) x[i] = 1;
            if(x[i]>1 && vx[i] >0) x[i] = -1;
            if(y[i]>1 && vy[i] >0) y[i] = -1;
            x[i]+=vx[i]*dt;
            y[i]+=vy[i]*dt;}
    }
    else {
        for (int i = 0; i<(order*order); i++){
           if(y[i]<-1 && vy[i] <0) {vy[i] = 0; y[i] =-1;}
            //if(y[i]<-1 && vy[i] <0) {vy[i] = -vy[i];}
            if(x[i]<-1 && vx[i] <0) vx[i] = -vx[i];
            if(x[i]>1 && vx[i] >0) vx[i] = -vx[i];
            if(y[i]>1 && vy[i] >0) vy[i] = -vy[i];
            x[i]+=vx[i]*dt;
            y[i]+=vy[i]*dt;
        }
    }
    t+=dt;
    
    usleep(400); // slow this down by waiting half a millisecond, so we don't do millions of timesteps per second
    walltime=glutGet(GLUT_ELAPSED_TIME); // what time is it now?
    if (walltime > nextdraw) glutPostRedisplay();  // nextdraw keeps track of when we think the screen needs updating
}

void circle(double x, double y, double r){
    int i;
    double angle;
    int sides;
    
    if(order>90){
        if(order>90)
        glPointSize(1.5f);
        glBegin(GL_POINTS); //starts drawing of points
        glVertex3f(x,y,0);//upper-right corner
        glEnd();//end drawing of points
    } else {
        if(order>60)
            sides = 6;
     else if(order>40)
        sides = 6;
    else if(order>=30)
        sides = 10;
    else if(order>10)
         sides = 16;
    else sides = 32;
    
    glBegin(GL_LINE_LOOP); // this does continuous lines at all the vertices; you can also do GL_LINES for single lines
    
    for (i=0;i<sides;i++) // Because the balls are so small 8 sides will suffice
    {
        angle = i*2*M_PI/sides;
        glVertex3f((x+cos(angle)*r), (y+sin(angle)*r),0); // I don't know how to use GL's perspective stuff, so the z-coordinate here is 0
    }
    glEnd(); // end the drawing command we started with glBegin
    }
}


void disp(void) // this function will trigger whenever glutPostRedisplay() is called
{
    frames++;
    glClear(GL_COLOR_BUFFER_BIT); // reset the screen to something blank
    static double colorx;
    static double colory;
    static double energy;
    
    //glColor3f(1.0f,1.0f,1.0f);
    
    //Draws the 10000 Circles
    for (int i =0; i<(order*order); i++)
    {
        //My current poor attempt to quantify the energy of the particle
        energy = pow(vx[i],2) + pow(vy[i],2);
        
        //Changes the colors of the balls based on ammount of energy
        if (color == 0){
            glColor3f(1.0f,1.0f,1.0f);
            glClearColor(0,0,0, 1.0);
        }
        
        if (color == 1){
            glColor3f(0.0f,0.0f,0.0f);
            glClearColor(1,1,1, 1.0);
        }
        
        if (color == 2){
            glColor3f(aa ,ba ,ca);
            glClearColor((ca-.7),(ba-.7),(aa-.7), 1.0);
            if (transitiona ==1 && aa > 1.5)
            {transitiona = -1;}
            if (transitiona ==-1 && aa < .3)
            {transitiona = 1; }
            
            if(transitiona == 1)
            { aa = aa +aaa;}
            if (transitiona == -1)
            { //printf("reverse\n");
                aa = aa -aaa;}
            
            if (transitionb ==1 && ba > 1.5)
            {transitionb = -1;}
            if (transitionb ==-1 && ba < .3)
            {transitionb = 1; }
            
            if(transitionb == 1)
            { ba = ba +bbb;}
            if (transitionb == -1)
            { //printf("reverse\n");
                ba = ba -bbb;}
            
            if (transitionc ==1 && ca > 1.5)
            {transitionc = -1;}
            if (transitionc ==-1 && ca < .3)
            {transitionc = 1; }
            
            if(transitionc == 1)
            { ca = ca +ccc;}
            if (transitionb == -1)
            {
                ca = ca -ccc;}
            
        }
        if (color == 3){
            double a1,b1,c1;
            a1 = .2;
            b1 = .5/(100.0*(pow(energy,2.0/3)+.00001));
            c1 = 0.5;
            glColor3f(a1,b1,c1);
            
            
        }
        if (color == 4){
            float ac = (rand() % 11)/10.0;
            float bc = (rand() % 11)/10.0;
            float cc = (rand() % 11)/10.0;
            float dc = (rand() % 11)/10.0;
            
            if(energy < .0000001)
            {glColor3f(ac, cc, dc);}
            else if (energy < .001)
            {glColor3f(bc, cc, dc);}
            else if (energy < .002)
            {glColor3f(cc, dc, ac);}
            else if(energy < .04)
            {glColor3f(dc,ac,ac);}
            else
                glColor3f(ac ,bc , cc);
            
        }
        
        if (color == 5){
            aa = 0;
            ba = 0;
            ca = 0;
            
            
            for(int p = 0; p<bars; p++){
                aa=1.0*p/bars;
                ba=0.6;
                ca=0.6;
                if((x[i]+1)>(p/((float)(bars/2)))&&(x[i]+1)<((p+1)/((float)(bars/2)))){
                    glColor3f(aa,ba,ca);
                }
                
            }
            
            
            
        }
        
        if (color == 6){
            aa = 0;
            ba = 0;
            ca = 0;
            
            
            for(int p = 0; p<bars; p++){
                aa=0.8;
                ba=0.6*p/bars;
                ca=0.3*p/bars;
                if((x[i]+1)>(p/((float)(bars/2)))&&(x[i]+1)<((p+1)/((float)(bars/2)))){
                    glColor3f(aa,ba,ca);
                }
                
            }
            
        }
        if (color == 7){
            double a1,b1,c1;
            a1 = 1;
            b1 = 1-.2/(100.0*(pow(energy,2.0/3)+.000001));
            c1 = 1-.5/(100.0*(pow(energy,2.0/3)+.000001));
            glColor3f(a1,b1,c1);
            
            
        }
        if (color == 8){
            aa = 0;
            ba = 0;
            ca = 0;
            
            for(int p = 0; p<bars; p++){
                if(p%2 ==0){
                    aa=0.8;
                    ba=0.6*p/bars;
                    ca=0.3*p/bars;}
                else{
                    aa=0.8*p/bars;
                    ba=0.6;
                    ca=0.6;
                }
                if((x[i]+1)>(p/((float)(bars/2)))&&(x[i]+1)<((p+1)/((float)(bars/2)))){
                    glColor3f(aa,ba,ca);
                }
                
            }
        }
//New Color Here
        if (color == 9){
            
        }

        circle(x[i],y[i],size*2);
    }
    
    glutSwapBuffers(); // this is the equivalent of anim's "F" command: "write the frame we've completed to the screen and start working on a new one"
    nextdraw=glutGet(GLUT_ELAPSED_TIME)+15; // schedule the next screen refresh to be 15ms from now, which is about 60fps
}

void move(int i, double xin, double yin){
    // while((x[i]!=xin)||(y[i]!=yin)){
    
    umag2[i] = sqrt(pow((xin-x[i]),2)+pow((xin-y[i]),2));
    
    vx2[i] = (xin-x[i])/umag2[i]; //x direction
    vy2[i] = (yin-y[i])/umag2[i]; //y direction
    vx[i] += vx2[i]*umag2[i]/100;
    vy[i] += vy2[i]*umag2[i]/100;
    
    
    //  }
}
void keyb(unsigned char key, int m, int n)    // this function will trigger whenever the user presses a key
{   if (key == 'P'){
    if(paused==1)
    { Mix_ResumeMusic();
        paused= paused * -1; }
    else{
        Mix_PauseMusic();
        paused=paused *-1;}
    
    
}
    if (key == 'Q') {exit(0);} // quit
    if (key == 'F') {printf("Drawn %d frames and simulated %d RK2 steps in %d milliseconds\n",frames,steps,glutGet(GLUT_ELAPSED_TIME)-last_walltime);
        last_walltime=glutGet(GLUT_ELAPSED_TIME);
        frames=0;
        steps=0;
    }
    //resets everything to nice neat rows
    if (key == 'R'){
        for(int i =0; i<order; i++)
        {
            for(int j =0; j<order; j++)
            {
                x[(order*i+j)] = betweendistance*i-.9999+betweendistance/2;
                y[(order*i+j)] = j*betweendistance-.9999+betweendistance/2;
                
                vx[(order*i+j)] = 0;
                vy[(order*i+j)] = 0;
            }
        }
        
    }
    if (key == 'V'){
        for (int i =0; i<100; i++)
        {printf("Speedx %d: %lf \t Speedy %d: %lf\n",i,vx[i],i,vy[i]);}
    }
    if (key == 'r')//reverses direction of force
    {reverse = reverse*-1;}
    if (key == 'a')//reverses direction of force
    {bar = bar*-1;}
    if (key == 'm')//reverses direction of force
    {mousekick = mousekick*-1;}
    if (key == 'g')//reverses direction of force
    {gravity = gravity*-1;}
    if (key == 'l')//reverses direction of force
    {looper = looper*-1;}
    
    if (key == 'S'){
        double radiuss = 0;
        double theta = 0;
        
        for(int i = 0; i<order;i++)
        {
            for(int j =0; j<order; j++)
            {
                x[(order*i+j)] = radiuss*sin(theta);
                y[(order*i+j)] = radiuss*cos(theta);
                
                vx[(order*i+j)] = 0;
                vy[(order*i+j)] = 0;
                // theta = theta+.015;
                // radiuss = radiuss + .0001;
                
                theta = theta+10*size;
                radiuss = radiuss + betweendistance/200;
                
            }
            
        }
    }
    
    
    if (key == 'C'){
        double radiuss = .7;
        double theta = 0;
        
        for(int i = 0; i<order;i++)
        {
            for(int j =0; j<order; j++)
            {
                
                move(order*i+j,radiuss*sin(theta), radiuss*cos(theta));
                
                
                // vx[(order*i+j)] = 0;
                // vy[(order*i+j)] = 0;
                // theta = theta+.015;
                // radiuss = radiuss + .0001;
                
                theta = theta+order;
                
                
            }
            
        }
    }
    if (key == 'd')//decreases force based on distance squared
    {distance = distance*-1;}
    if (key == 'v')//places objects in viscous/air resistance surrounding
    {viscous=viscous*-1;}
    if (key == 'b')//Toggles on black hole
    {blackhole=blackhole*-1;}
    if (key == 'n')//Toggles on color
    {printf("Enter the number between 1-100: ");
        scanf("%d",&order);
        printf("%d\n",order);
        while((order>100)||(order<1))
        { printf("Invalid input: Enter the number between 1-100: ");
            scanf("%d",&order);}
        size = .2/order;
        betweendistance = size*10;
        for(int i =0; i<order; i++)
        {
            for(int j =0; j<order; j++)
            {
                x[(order*i+j)] = betweendistance*i-.9999+betweendistance/2;
                y[(order*i+j)] = j*betweendistance-.9999+betweendistance/2;
                
                vx[(order*i+j)] = 0;
                vy[(order*i+j)] = 0;
            }
        }
        
    }
    if (key == '1')//Toggles on color
    {color=1;}
    if (key == '2')//Toggles on color
    {color=2;}
    if (key == '3')//Toggles on color
    {color=3;}
    if (key == '4')//Toggles on color
    {color=4;}
    if (key == '5')//Toggles on color
    {color=5;}
    if (key == '6')//Toggles on color
    {color=6;}
    if (key == '7')//Toggles on color
    {color=7;
        if(rand()%100> 50){
            transitiona = -1;
        }
        else {
            transitiona = 1;
            
        }
        
        if(rand()%100> 50){
            transitionb = -1;
        }
        else {
            transitionb = 1;
            
        }
        if(rand()%100> 50){
            transitionc = -1;
        }
        else {
            transitionc = 1;
            
        }
    }
    if (key == '8')//Toggles on color
    {color=8;}
    if (key == '9')//Toggles on color
    {color=9;}
    if (key == '0')//Toggles on color
    {color=0;}
    if (key == 'c')
    {   printf("COLORS:\n");
        printf("0: Classic Black\n");
        printf("1: Ferrofluid\n");
        printf("2: Transitions\n");
        printf("3: Matrix\n");
        printf("4: Glitter\n");
        printf("5: Teal/Pink\n");
        printf("6: Red/Yellow\n");
        printf("7: Fire\n");
        printf("8: Alternating\n");
        printf("\n\n\n");
    }
    if (key == 'p')//Prints out the status of all the toggles
    {
        printf("TOGGLES: \n");
        printf("Reverse: %s\n",reverse ? "ON" : "OFF");
        printf("Distance: %s\n",distance ? "ON" : "OFF");
        printf("Damping:%s\n",viscous ? "ON" : "OFF");
        printf("Black Hole:%s\n",blackhole ? "ON" : "OFF");
        printf("Color: %d\n\n",color);
    }
    if (key == 'i')//Prints out the instruction/controls
    {
        printf("Instructions\nPress 'Shift-r' to reset the Screen\nPress 'n' to set number of stars\nPress 'd' to turn off distance based force\nPress 'r' to reverse the direction of the default force\nPress 'g' to toggle gravity\nPress 'l' to turn on borders that wrap around\nPress 'v' to toggle damping to all particles\nPress 'b' to toggle the black hole\nPress '1-9' for colors\nPress 'c' for color listing\nPress 'p' to print out the currect status of all the toggles\nPress 'i' for the instructions again\n\nPress 'P' to pause the music\nPress 'm' for radial bars\n\n");
    }
    
}


/**
 * Convert seconds into hh:mm:ss format
 * Params:
 *	seconds - seconds value
 * Returns: hms - formatted string
 **/
char* seconds_to_time(float raw_seconds) {
    char *hms;
    int hours, hours_residue, minutes, seconds, milliseconds;
    hms = (char*) malloc(100);
    
    sprintf(hms, "%f", raw_seconds);
    
    hours = (int) raw_seconds/3600;
    hours_residue = (int) raw_seconds % 3600;
    minutes = hours_residue/60;
    seconds = hours_residue % 60;
    milliseconds = 0;
    
    // get the decimal part of raw_seconds to get milliseconds
    char *pos;
    pos = strchr(hms, '.');
    int ipos = (int) (pos - hms);
    char decimalpart[15];
    memset(decimalpart, ' ', sizeof(decimalpart));
    strncpy(decimalpart, &hms[ipos+1], 3);
    milliseconds = atoi(decimalpart);
    
    
    sprintf(hms, "%d:%d:%d.%d", hours, minutes, seconds, milliseconds);
    return hms;
}


int main(int argc, char **argv)
{
    //Macs only path optimization
    /*
    char path[1024];
    uint32_t size = sizeof(path);
    if (_NSGetExecutablePath(path, &size) == 0)
        printf("executable path is %s\n", path);
    else
        printf("buffer too small; need size %u\n", size);
    
    strcpy(filename, path);
    std::string str(filename);
    str.replace(str.length()-9,str.length(),"/music.wav");
    
    printf("updated executable path is %s\n", str.c_str());
      ptr = fopen(str.c_str(), "rb");
    */
    
    
    
    // open file
    printf("Opening  file..\n");
    //Comment up till here to
    char file[255];
    printf("Enter your filename:\t");
     scanf("%s",file);
    
    ptr = fopen(file, "rb");
    if (ptr == NULL) {
        printf("Error opening file\n");
        exit(1);
    }else{
        printf("Successfully opened file\n");
        
    }
    
    int read = 0;
    
    
    read = fread(header.riff, sizeof(header.riff), 1, ptr);
    printf("(1-4): %s \n", header.riff);
    
    read = fread(buffer4, sizeof(buffer4), 1, ptr);
    printf("%u %u %u %u\n", buffer4[0], buffer4[1], buffer4[2], buffer4[3]);
    
    // convert little endian to big endian 4 byte int
    header.overall_size  = buffer4[0] |
    (buffer4[1]<<8) |
    (buffer4[2]<<16) |
    (buffer4[3]<<24);
    
    
    printf("(5-8) Overall size: bytes:%u, Kb:%u \n", header.overall_size, header.overall_size/1024);
    
    read = fread(header.wave, sizeof(header.wave), 1, ptr);
    printf("(9-12) Wave marker: %s\n", header.wave);
    
    read = fread(header.fmt_chunk_marker, sizeof(header.fmt_chunk_marker), 1, ptr);
    printf("(13-16) Fmt marker: %s\n", header.fmt_chunk_marker);
    
    read = fread(buffer4, sizeof(buffer4), 1, ptr);
    printf("%u %u %u %u\n", buffer4[0], buffer4[1], buffer4[2], buffer4[3]);
    
    // convert little endian to big endian 4 byte integer
    header.length_of_fmt = buffer4[0] |
    (buffer4[1] << 8) |
    (buffer4[2] << 16) |
    (buffer4[3] << 24);
    printf("(17-20) Length of Fmt header: %u \n", header.length_of_fmt);
    
    read = fread(buffer2, sizeof(buffer2), 1, ptr); printf("%u %u \n", buffer2[0], buffer2[1]);
    
    header.format_type = buffer2[0] | (buffer2[1] << 8);
    char format_name[10] = "";
    if (header.format_type == 1)
        strcpy(format_name,"PCM");
    else if (header.format_type == 6)
        strcpy(format_name, "A-law");
    else if (header.format_type == 7)
        strcpy(format_name, "Mu-law");
    
    printf("(21-22) Format type: %u %s \n", header.format_type, format_name);
    
    read = fread(buffer2, sizeof(buffer2), 1, ptr);
    printf("%u %u \n", buffer2[0], buffer2[1]);
    
    header.channels = buffer2[0] | (buffer2[1] << 8);
    printf("(23-24) Channels: %u \n", header.channels);
    
    read = fread(buffer4, sizeof(buffer4), 1, ptr);
    printf("%u %u %u %u\n", buffer4[0], buffer4[1], buffer4[2], buffer4[3]);
    
    header.sample_rate = buffer4[0] |
    (buffer4[1] << 8) |
    (buffer4[2] << 16) |
    (buffer4[3] << 24);
    
    printf("(25-28) Sample rate: %u\n", header.sample_rate);
    
    read = fread(buffer4, sizeof(buffer4), 1, ptr);
    printf("%u %u %u %u\n", buffer4[0], buffer4[1], buffer4[2], buffer4[3]);
    
    header.byterate  = buffer4[0] |
    (buffer4[1] << 8) |
    (buffer4[2] << 16) |
    (buffer4[3] << 24);
    printf("(29-32) Byte Rate: %u , Bit Rate:%u\n", header.byterate, header.byterate*8);
    
    
    read = fread(buffer2, sizeof(buffer2), 1, ptr);
    printf("%u %u \n", buffer2[0], buffer2[1]);
    
    header.block_align = buffer2[0] |
    (buffer2[1] << 8);
    printf("(33-34) Block Alignment: %u \n", header.block_align);
    
    read = fread(buffer2, sizeof(buffer2), 1, ptr);
    printf("%u %u \n", buffer2[0], buffer2[1]);
    
    header.bits_per_sample = buffer2[0] |
    (buffer2[1] << 8);
    printf("(35-36) Bits per sample: %u \n", header.bits_per_sample);
    
    read = fread(header.data_chunk_header, sizeof(header.data_chunk_header), 1, ptr);
    printf("(37-40) Data Marker: %s \n", header.data_chunk_header);
    
    read = fread(buffer4, sizeof(buffer4), 1, ptr);
    printf("%u %u %u %u\n", buffer4[0], buffer4[1], buffer4[2], buffer4[3]);
    
    header.data_size = buffer4[0] |
				(buffer4[1] << 8) |
				(buffer4[2] << 16) |
				(buffer4[3] << 24 );
    printf("(41-44) Size of data chunk: %u \n", header.data_size);
    
    
    
    
    // calculate no.of samples
    long num_samples = (8.0 * header.data_size) / (header.channels * header.bits_per_sample);
    printf("Number of samples:%lu \n", num_samples);
    
    long size_of_each_sample = (header.channels * header.bits_per_sample) / 8;
    printf("Size of each sample:%ld bytes\n", size_of_each_sample);
    
    // calculate duration of file
    float duration_in_seconds = (float) header.overall_size / header.byterate;
    printf("Approx.Duration in seconds=%f\n", duration_in_seconds);
    printf("Approx.Duration in h:m:s=%s\n", seconds_to_time(duration_in_seconds));
    int k = 0;
    
    
    printf("Closing file..\n");
    // fclose(ptr);
    
    
    
    int boundaries = 0;
    //lines everything up into nice neat rows
    for(int i =0; i<order; i++)
    {
        for(int j =0; j<order; j++)
        {
            x[(order*i+j)] = betweendistance*i-.9999+betweendistance/2;
            y[(order*i+j)] = j*betweendistance-.9999+betweendistance/2;
        }
    }
    
    double radiuss = .7;
    double theta = 0;
    aaa = (rand()%30)/(100000000.00);
    bbb = (rand()%30)/(100000000.00);
    ccc = (rand()%30)/(100000000.00);
    /*
     for(int i = 0; i<order;i++)
     {
     for(int j =0; j<order; j++)
     {
     x[(order*i+j)] = radiuss*sin(theta);
     y[(order*i+j)] = radiuss*cos(theta);
     
     // theta = theta+.015;
     // radiuss = radiuss + .0001;
     
     theta = theta+order;
     //radiuss = radiuss + betweendistance/200;
     
     }
     
     }
     */
    printf("\n\n==========================Gravity 2=============================\n");
    printf("Gravity 2\n");
    // Instructions
    printf("Instructions\nPress 'Shift-r' to reset the Screen\nPress 'n' to set number of stars\nPress 'd' to turn off distance based force\nPress 'r' to reverse the direction of the default force\nPress 'g' to toggle gravity\nPress 'l' to turn on borders that wrap around\nPress 'v' to toggle damping to all particles\nPress 'b' to toggle the black hole\nPress '1-9' for colors\nPress 'c' for color listing\nPress 'p' to print out the currect status of all the toggles\nPress 'i' for the instructions again\nPress 'P' to pause the music\nPress 'm' for radial bars\n\n");
    srand (time(NULL));
    
    
    // open 44.1KHz, signed 16bit, system byte order,
    //      stereo audio, using 1024 byte chunks
    if(Mix_OpenAudio(44100, MIX_DEFAULT_FORMAT, 2, 1024)==-1) {
        printf("Mix_OpenAudio: %s\n", Mix_GetError());
        exit(2);
    }
    Mix_Music *music;
    music=Mix_LoadMUS(file);
    if( music == NULL )
    {
        printf("Not found\n");
    }
    if(Mix_PlayMusic(music, 1)==-1) {
        printf("Mix_PlayMusic: %s\n", Mix_GetError());
        // well, there's no music, but most games don't break without music...
    }
    //start = clock();
    gettimeofday(&start, NULL);
    startm = (start.tv_sec) * 1000 + (start.tv_usec) / 1000 ;
    
    startm-=200;
    //INITIALIZATION
    glutInit(&argc, argv);
    
    //set rgba and double buffering
    glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE |  GLUT_MULTISAMPLE);
    
    //set window size and position and title
    glutInitWindowSize(700,700); // modify if you have a low resolution screen
    glutInitWindowPosition(100,100);
    glutCreateWindow("Gravity 2");
    
    //glutInitWindowSize(350,700); // modify if you have a low resolution screen
    //glutInitWindowPosition(100,100);
    //glutCreateWindow("Menu");

    //SET CALLBACKS
    glutDisplayFunc(disp); // function to execute whenever glutPostRedisplay is called
   //glutDisplayFunc( Button::display);

    glutKeyboardFunc(keyb); // function to execute whenever a key is pressed
    glutMouseFunc(mouse);
    glutMotionFunc(mousecor);
    glutIdleFunc(idle); // function to execute whenever we have nothing else to do
    
    //DO OPENGL INIT
    glEnable(GL_BLEND); // turn on alpha channel
    glEnable(GL_MULTISAMPLE); // turn on antialiasing
    glBlendFunc(GL_SRC_ALPHA,GL_ONE_MINUS_SRC_ALPHA); // some magic that has to do with alpha blending; this is the only thing I use here
    glClearColor(0.0, 0.0, 0.0, 1.0); // background color: RGB = 0, alpha = 1
    
    glMatrixMode(GL_PROJECTION); // I don't do OpenGL 3D perspective, but this controls it (somehow) -- I found this in a tutorial. Need to learn how this works in more detail!
    glLoadIdentity();
    
    walltime=last_walltime=glutGet(GLUT_ELAPSED_TIME); // update our clocks
    glutMainLoop(); // start the thing
    
    
}
