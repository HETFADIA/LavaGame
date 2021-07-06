=items[0]
            b=items[1]
            if(dp[a][b]>lvl){
                dp[a][b]=lvl
                if(a-1>=0 && !visited[a-1][b] && s[a-1][b]!='#') q.enqueue([a-1,b]);
                if(b-1>=0 && !visited[a][b-1] && s[a][b-1]!='#') q.enqueue([a,b-1]);
                if(a+1<n && !visited[a+1][b] && s[a+1][b]!='#') q.enqueue([a+1,b]);
                if(b+1<m && !visited[a][b+1] && s[a][b+1]!='#') q.enqueue([a,b+1]);
                visited[a][b]=true;
            }