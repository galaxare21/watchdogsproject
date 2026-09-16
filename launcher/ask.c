#include <stdio.h>
#include <string.h>

#include "ask.h"

int ask_number(void){
    printf("which one : ");
    int c = getchar();
    printf("\n");
    return c;

}

