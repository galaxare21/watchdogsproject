# include <stdio.h>

# include "getter.c"

int install_bot(){
    char *pm = package_manager();
    if(!pm){
        fprintf(stderr, "Error");
        return 1;
    }
    printf("your package manager is %s\n", pm);

    if(binary_check("npm")) printf("npm manquant\n");

    if(binary_check("mariadb")) printf("mariadb manquant\n");

    if(binary_check("node")) printf("node.js manquant\n");

    return 0;
}

int install_website(){


}

int install_package(char *name){
    char *pm = package_manager();
    if(!pm){
        fprintf(stderr, "Error");
        return 1;
    }


    if (pm == "gentoo")                    return "emerge ";
    if (pm == "debian" || pm == "ubuntu") return "apt install ";
    if (pm == "fedora")                    return "dnf install -y";
    if (pm == "arch")                       return "pacman -S ";

}