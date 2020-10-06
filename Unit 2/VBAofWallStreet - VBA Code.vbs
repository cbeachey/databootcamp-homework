Sub StockSummary():

Dim Ticker As String
Dim StockVolume As Double
Dim SummaryTableRow As Integer
Dim Year_Open As Double
Dim Year_Close As Double
Dim Year_Change As Double
Dim Percent_Change As Double
Dim LastRow As Long
Dim ws As Worksheet
Dim Column As Integer
Dim Row As Double
Dim x As Long
Dim r1 As Range
Dim Last_Row As Long



For Each ws In ActiveWorkbook.Worksheets
    ws.Activate
    
        StockVolume = 0
        SummaryTableRow = 2
        Column = 2
        Row = 1
        
            ws.Cells(1, 10).Value = "Ticker"
            ws.Cells(1, 11).Value = "Yearly Change"
            ws.Cells(1, 12).Value = "Percent Change"
            ws.Cells(1, 13).Value = "Total Stock Volume"

        LastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row

        For i = 2 To LastRow

            If Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
            Ticker = Cells(i, 1).Value
            
            Year_Open = ws.Range("C" & Column)
            Year_Close = ws.Range("F" & i)
            Year_Change = Year_Close - Year_Open
            ws.Range("K" & Column).Value = Year_Change
                
                If (Year_Open = 0 And Year_Close = 0) Then
                    Percent_Change = 0
                    
                ElseIf (Year_Open = 0 And Year_Close <> 0) Then
                    Percent_Change = 1
                    
                Else
                    Percent_Change = Year_Change / Year_Open
                    ws.Range("L" & Column).Value = Percent_Change
                    
                End If
                
            
            StockVolume = StockVolume + Cells(i, 7).Value
            Range("J" & SummaryTableRow).Value = Ticker
            Range("M" & SummaryTableRow).Value = StockVolume
            SummaryTableRow = SummaryTableRow + 1
            Column = Column + 1
            StockVolume = 0

            Else

            StockVolume = StockVolume + Cells(i, 7).Value

            End If
        
        Next i
        
        ws.Columns("L").NumberFormat = "0.00%"
        ws.Columns("M").NumberFormat = "$#,##0.00_);($#,##0.00)"
      
     

        Last_Row = ws.Cells(Rows.Count, 11).End(xlUp).Row

            For x = 2 To Last_Row
                
                Set r1 = Range("K" & x)
                
                If r1.Value >= 0 Then
                    r1.Interior.Color = vbGreen
                
                ElseIf r1.Value < 0 Then
                    r1.Interior.Color = vbRed
      
                End If
        
            Next x
    
    Next ws

End Sub










