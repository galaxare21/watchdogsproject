#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "getter.h"

int binary_check(const char *name) {
    char *path = getenv("PATH");
    if (!path) return 0;

    char *path_copy = strdup(path);
    char *dir = strtok(path_copy, ":");
    char full[1024];
    int found = 0;

    while (dir) {
        snprintf(full, sizeof(full), "%s/%s", dir, name);
        if (access(full, X_OK) == 0) {
            found = 1;
            break;
        }
        dir = strtok(NULL, ":");
    }
    free(path_copy);
    return found;
}

char *package_manager(){
 FILE *f = fopen("/etc/os-release", "r");
    if (!f) return "non pris en charge";

    char line[256];
    static char id[64] = {0};
    while (fgets(line, sizeof(line), f)) {
        if (strncmp(line, "ID=", 3) == 0) {
            sscanf(line, "ID=%63s", id);
            // enlever d'éventuels guillemets
            char *p = id;
            while (*p) { if (*p == '"' || *p == '\'') memmove(p, p+1, strlen(p)); else p++; }
            break;
        }
    }
    fclose(f);

    if (strcmp(id, "gentoo") == 0)                    return "portage";
    if (strcmp(id, "debian") == 0 || strcmp(id,"ubuntu")==0) return "apt";
    if (strcmp(id, "fedora") == 0)                    return "dnf";
    if (strcmp(id, "arch") == 0)                       return "pacman";
    return "non pris en charge";
}




