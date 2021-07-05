#pragma GCC optimize("O2")
#include <bits/stdc++.h>
#include <stdio.h>
using namespace std;
#define fast                          \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL)
#define int long long
/*
#define int long long
#define ll long double
#define lld long long int
#define p(x) cout<<x<<endl
#define vect(x,n) vector<int>x(n,0)
#define sorta(v) sort(v.begin(),v.end())
#define sortd(v) sort(v.begin(),v.end(),greater<int>())
#define rep(i,n)  for(int i=0;i<n;i++)
#define repd(i,n) for(int i=n-1;i>=0;i--)
#define all(v) v.begin(),v.end()
#define matrix(x,n,m) vector<vector<int>>x(n,vector<int>(m,0))
#define gcd(a,b) __gcd(a,b)
#define lcm(a,b) (a*b)/gcd(a,b)
#define lb lower_bound
#define ub upper_bound
#define F first
#define S second
#define pb push_back
#define pf push_front
#define mkp make_pair
*/
const long long INF = 1e15 + 7;
const int N = 2e5 + 10;
const int mod = 1e9 + 7;
int pow(int x, int y)
{
    int res = 1;
    while (y > (int)0)
    {
        if (y & (int)1)
            res = ((res) * (x));
        y = y >> (int)1;
        x = ((x) * (x));
    }
    return res;
}
int powm(int x, int y, int p)
{
    int res = 1;
    x = x % p;
    while (y > (int)0)
    {
        if (y & (int)1)
            res = (res * x) % p;
        y >>= (int)1;
        x = (x * x) % p;
    }
    return res;
}

// Try doing every DP using recursion
// Find the states of DP first and then parameter
// In recursion parameter most of the time are DP states itself, after that mrji apki

void bfs_monster(vector<pair<int, int>> &monsters, vector<vector<int>> &dp, vector<string> &s)
{
    int n = dp.size(), m = dp[0].size();
    vector<vector<bool>> visited(n, vector<bool>(m, false));
    int lvl = 0;
    queue<pair<int, int>> q;
    for (auto x : monsters)
        q.push({x.first, x.second});
    while (!q.empty())
    {
        lvl++;
        int t = q.size();
        for (int i = 0; i < t; i++)
        {
            int a = q.front().first;
            int b = q.front().second;
            q.pop();
            if (dp[a][b] > lvl)
            {
                dp[a][b] = lvl;
                if (a - 1 >= 0 && !visited[a - 1][b] && s[a - 1][b] != '#')
                    q.push({a - 1, b});
                if (b - 1 >= 0 && !visited[a][b - 1] && s[a][b - 1] != '#')
                    q.push({a, b - 1});
                if (a + 1 < n && !visited[a + 1][b] && s[a + 1][b] != '#')
                    q.push({a + 1, b});
                if (b + 1 < m && !visited[a][b + 1] && s[a][b + 1] != '#')
                    q.push({a, b + 1});
                visited[a][b] = true;
            }
        }
    }
    return;
}

bool bfs_a(int x, int y, vector<vector<int>> &dp, vector<string> &s)
{
    int n = dp.size(), m = dp[0].size();
    vector<vector<bool>> visited(n, vector<bool>(m, false));
    int lvl = 0;
    queue<pair<int, int>> q;
    q.push({x, y});
    while (!q.empty())
    {
        lvl++;
        int t = q.size();
        for (int i = 0; i < t; i++)
        {
            int a = q.front().first;
            int b = q.front().second;
            q.pop();
            if (a >= 0 && b >= 0 && a < n && b < m && !visited[a][b] && dp[a][b] > lvl && s[a][b] != '#')
            {
                dp[a][b] = min(dp[a][b], lvl);
                q.push({a - 1, b});
                q.push({a, b - 1});
                q.push({a + 1, b});
                q.push({a, b + 1});
                visited[a][b] = true;
                if (a == 0 || b == 0 || a == n - 1 || b == m - 1)
                {
                    s[a][b] = 'E';
                    return true;
                }
            }
        }
    }
    return false;
}

void solve()
{
    int n, m, a, b;
    cin >> n >> m;
    vector<string> s(n);
    for (int i = 0; i < n; i++)
        cin >> s[i];
    vector<vector<int>> dp(n, vector<int>(m, INT_MAX));
    vector<pair<int, int>> monsters;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (s[i][j] == 'M')
                monsters.push_back({i, j});
            else if (s[i][j] == 'A')
                a = i, b = j;
        }
    }
    bfs_monster(monsters, dp, s);
    if (bfs_a(a, b, dp, s))
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
    return;
}

int32_t main()
{
    fast;
    int ts = 1;
    //cin>>ts;
    while (ts--)
    {
        solve();
    }
}
