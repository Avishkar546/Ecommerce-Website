#include<iostream>
using namespace std;
int main(){
    int n = 6;
    int i = (n&~n)/2;
    i++;
    cout<<i;
}