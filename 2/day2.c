#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Day 2-1
int a()
{
	FILE * input = fopen("./input", "r");
	if (input == NULL) return EXIT_FAILURE;
	char * line = (char *) malloc(sizeof(char));
	size_t len;
	ssize_t size;
	char s[32];
	char * tok = (char *) malloc(sizeof(char));
	char * direction = (char *) malloc(sizeof(char));
	int h = 0, v = 0;
	while ((size = getline(&line, &len, input)) != -1)
	{
		strcpy(s, line);
		tok = strtok(s, " ");
		strcpy(direction, tok);
		tok = strtok(NULL, " ");
		if (!strcmp(direction, "forward")) h += atoi(tok);
		else
			v += atoi(tok) * (strcmp(direction, "up") ? -1 : 1);
	}
	printf("Result : %d\n", h * -v);
	free(direction);
	free(line);
	return EXIT_SUCCESS;
}

// Day 2-2
int b()
{
	FILE * input = fopen("./input", "r");
	if (input == NULL) return EXIT_FAILURE;
	char * line = (char *) malloc(sizeof(char));
	size_t len;
	ssize_t size;
	char s[32];
	char * tok = (char *) malloc(sizeof(char));
	char * direction = (char *) malloc(sizeof(char));
	int h = 0, v = 0, a = 0, val;
	while ((size = getline(&line, &len, input)) != -1)
	{
		strcpy(s, line);
		tok = strtok(s, " ");
		strcpy(direction, tok);
		tok = strtok(NULL, " ");
		val = atoi(tok);
		if (!strcmp(direction, "forward"))
		{
			h += val;
			v += val * a;
		}
		else
		{
			a += val * (strcmp(direction, "up") ? -1 : 1);
		}
	}
	printf("Result : %d\n", h * -v);
	free(direction);
	free(line);
	return EXIT_SUCCESS;
}

int main()
{
	a();
	b();
	return 0;
}