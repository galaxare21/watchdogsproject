#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "main.h"

#include "install.c"
#include "ask.c"
#include "message.c"

int main(int argc, char *argv[]){
    uid_t euid = geteuid(); 
    int opt;
    if (euid == 0){

    while ((opt = getopt(argc, argv, "h")) != -1){
        switch (opt) {
            case 'h':
                print_help();
                return 0;
            case '?': 
                print_help();
        
        }

    }

    print_menu();
    rewind:
    switch(ask_number()){
        case '1':
            install_bot();
            break;
        case '2':
            break;
        case '3':
            break;
        case '4':
            break;
        default:
            goto rewind;
            break;
    }

return 0;
} else {
    printf("Must be run as sudo!\n");
    return 1;
}
    
}